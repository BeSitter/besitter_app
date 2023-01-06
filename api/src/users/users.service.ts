import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { User } from './entities/user.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateUserDto } from './dtos/create-user.dto';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import {
  ACCOUNT_OPTIONAL_FIELDS_PERCENTAGES,
  ACCOUNT_REQUIRED_FIELDS_PERCENTAGES,
} from 'src/utils/constants';
import { ACCOUNT_STATUS, ACCOUNT_TYPE, BADGE } from 'src/utils/enums';
import { AccountsService } from 'src/accounts/accounts.service';
import { SitterAccount } from 'src/accounts/entities/sitter-account.entity';
import { ClientAccount } from 'src/accounts/entities/client-account.entity';

const scrypt = promisify(_scrypt);

@Injectable()
export class UsersService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private repo: Repository<User>,
    private readonly mailerService: MailerService,
    private accountsService: AccountsService,
    private connection: Connection,
  ) {}

  async sendEmailVerification(email: string): Promise<string> {
    const token = this.jwtService.sign({ email });
    return this.mailerService
      .sendMail({
        to: email,
        from: process.env.EMAIL,
        subject: 'BeSitter | Veuillez vérifier votre adresse e-mail',
        template: 'email-verification',
        context: {
          redirectionUrl: `${
            process.env.NODE_ENV === 'development'
              ? process.env.LOCAL_WEBSITE_URL
              : process.env.DEPLOYED_WEBSITE_URL
          }/register/complete?token=${token}`,
        },
      })
      .then(() => {
        return JSON.stringify({
          success: true,
          message: 'Verification email sent successfully',
        });
      })
      .catch(() => {
        throw new BadRequestException('Failed to send verification email');
      });
  }

  async sendPasswordResetEmail(email: string): Promise<string> {
    const token = this.jwtService.sign({ email });
    return this.mailerService
      .sendMail({
        to: email,
        from: process.env.EMAIL,
        subject: 'BeSitter | Réinitialisation de votre mot de passe',
        template: 'password-reset',
        context: {
          redirectionUrl: `${process.env.WEBSITE_URL}/password/reset?token=${token}`,
        },
      })
      .then(() => {
        return JSON.stringify({
          success: true,
          message: 'Password reset email sent successfully',
        });
      })
      .catch(() => {
        throw new BadRequestException('Failed to send password reset email');
      });
  }

  async register(data: Partial<CreateUserDto>): Promise<any> {
    let completionProgress = 0;
    const earnedBadges: Array<BADGE> = [];
    let decodedToken: any;
    const isSitterAccount = [
      ACCOUNT_TYPE.BABY_SITTER,
      ACCOUNT_TYPE.HOME_CARE_ASSISTANT,
    ].includes(data.accountType);

    // Step 1: Check if the user already exists or not
    try {
      decodedToken = await this.jwtService.verify(data.token);
    } catch (err) {
      throw new BadRequestException('Invalid token');
    }

    if (!decodedToken && !decodedToken.email) {
      throw new BadRequestException('Invalid token');
    }

    const users = await this.find(decodedToken.email);

    if (users.length) {
      throw new BadRequestException('Email in use');
    }

    // STEP 2: CHECK FOR ACCOUNT TYPE: IF SITTER, CHECK FOR REQUIRED FIELDS FOR ACCOUNT GENERATION, CALCULATE INITIAL COMPLETION PROGRESS AND ASSIGN BADGES.
    if (isSitterAccount) {
      const requiredFields = [
        data.dateOfBirth,
        data.bio,
        data.spokenLanguages,
        data.hourlyRate,
        data.availabilityPeriods,
        data.profilePicture,
        data.proposedServices,
      ];
      if (requiredFields.includes(null) || requiredFields.includes(undefined)) {
        throw new BadRequestException(
          'One or more required fields are missing',
        );
      } else {
        completionProgress = this.calculateCompletionProgress(data);
      }
      if (completionProgress === 100) {
        earnedBadges.push(BADGE.PROFILE_COMPLETED);
      }
    }

    // STEP 3: ENCRYPT PASSWORD
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(data.password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');

    // STEP 4: CREATE AND SAVE USER AND ACCOUNT
    try {
      const userData: Partial<User> = {
        email: decodedToken.email,
        firstName: data.firstName,
        lastName: data.lastName,
        accountType: data.accountType,
        password: result,
      };

      const queryRunner = this.connection.createQueryRunner();

      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        const newUser = queryRunner.manager.create(User, userData);
        const savedUser = await queryRunner.manager.save(newUser);

        const accountData: Partial<SitterAccount> | Partial<ClientAccount> = {
          ...data,
          isEmailVerified: true,
          badges: earnedBadges,
          profileCompletionProgress: completionProgress,
          user: savedUser,
          accountStatus:
            completionProgress >= 50
              ? ACCOUNT_STATUS.APPROVED
              : ACCOUNT_STATUS.PENDING_CONFIRMATION,
        };

        const newAccount: SitterAccount | ClientAccount = isSitterAccount
          ? await this.accountsService.createSitterAccountInstance(accountData)
          : await this.accountsService.createClientAccountInstance(accountData);

        const savedAccount = await queryRunner.manager.save(newAccount);

        await queryRunner.commitTransaction();

        return JSON.stringify({
          user: savedUser,
          account: savedAccount,
          message: 'User registered successfully',
        });
      } catch (err) {
        await queryRunner.rollbackTransaction();
        console.log(err);
        throw new BadRequestException(
          'Failed to create new user and account records',
        );
      } finally {
        await queryRunner.release();
      }
    } catch (err) {
      throw new BadRequestException(err.response.message);
    }
  }

  async login(email: string, password: string): Promise<User> {
    const [user] = await this.find(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new UnauthorizedException('Incorrect credentials');
    }

    return user;
  }
  async resetPassword(token: string, newPassword: string): Promise<string> {
    let decodedToken: any;
    try {
      decodedToken = await this.jwtService.verify(token);
    } catch (err) {
      throw new BadRequestException('Invalid token');
    }

    if (!decodedToken && !decodedToken.email) {
      throw new BadRequestException('Invalid token');
    }
    const [user] = await this.find(decodedToken.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(newPassword, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');
    try {
      const updatedUser = await this.update(user, {
        password: result,
      });
      return JSON.stringify({
        user: updatedUser,
        message: 'User password resetted successfully',
      });
    } catch (error) {
      throw new BadRequestException('Failed to reset password');
    }
  }

  async findOne(id: number): Promise<User> {
    const user = await this.repo.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async find(email: string): Promise<User[]> {
    const users = await this.repo.find({ email });

    if (!users) {
      throw new NotFoundException('Users not found');
    }

    return users;
  }

  async update(user: User, attrs: Partial<User>) {
    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, attrs);

    try {
      const updatedUser = await this.repo.save(user);
      return updatedUser;
    } catch (err) {
      throw new BadRequestException('Failed to update user');
    }
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const removedUser = await this.repo.remove(user);

    return removedUser;
  }

  calculateCompletionProgress(data: Partial<CreateUserDto>): number {
    let completionProgress = 0;
    completionProgress = Object.values(
      ACCOUNT_REQUIRED_FIELDS_PERCENTAGES,
    ).reduce((partialSum, a) => partialSum + a, 0);

    Object.keys(ACCOUNT_OPTIONAL_FIELDS_PERCENTAGES).forEach((key) => {
      if (data[key]) {
        completionProgress += ACCOUNT_OPTIONAL_FIELDS_PERCENTAGES[key];
      }
    });
    return completionProgress;
  }
}
