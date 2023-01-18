import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  InternalServerErrorException,
  NotFoundException,
  Patch,
  Post,
  Session,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { CurrentUser } from './decorators/current-user.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { EmailVerificationDto } from './dtos/email-verification.dto';
import { PasswordResetDto } from './dtos/password-reset.dto';
import { UserCredentialsDto } from './dtos/user-credentials.dto';
import { UserDto } from './dtos/user.dto';
import { VerifyTokenDto } from './dtos/verify-token.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('users')
@Serialize(UserDto)
@Controller({
  path: '/users',
})
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/send-verification-email')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'Verification email sent successfully',
  })
  @ApiBadRequestResponse({
    description: 'Failed to send verification email',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong while sending verification email',
  })
  async sendEmailVerification(@Body() body: EmailVerificationDto) {
    return this.userService
      .sendEmailVerification(body.email)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        switch (err.response?.statusCode) {
          case 400:
            throw new BadRequestException(err.response?.message);
          default:
            throw new InternalServerErrorException(
              'Something went wrong while sending verification email',
            );
        }
      });
  }

  @Post('/send-password-reset-email')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'Password reset email sent successfully',
  })
  @ApiBadRequestResponse({
    description: 'Failed to send password reset email',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong while sending password reset email',
  })
  async sendPasswordResetEmail(@Body() body: EmailVerificationDto) {
    return this.userService
      .sendPasswordResetEmail(body.email)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        switch (err.response?.statusCode) {
          case 400:
            throw new BadRequestException(err.response?.message);
          default:
            throw new InternalServerErrorException(
              'Something went wrong while sending password reset email',
            );
        }
      });
  }

  @Post('/verify-token')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'Token verified successfully',
  })
  @ApiBadRequestResponse({
    description: 'Invalid token',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong while verifying token',
  })
  async verifyToken(@Body() body: VerifyTokenDto) {
    return this.userService
      .verifyToken(body.token)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        switch (err.response?.statusCode) {
          case 400:
            throw new BadRequestException('Invalid token');
          default:
            throw new InternalServerErrorException(
              'Something went wrong while verifying token',
            );
        }
      });
  }

  @Post('/register')
  @HttpCode(201)
  @ApiCreatedResponse({
    description: 'User registered successfully',
  })
  @ApiBadRequestResponse({
    description:
      'Invalid token || One or more required fields are missing || Email in use || Failed to register a user',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong while registering a new user',
  })
  async register(@Body() body: CreateUserDto, @Session() session: any) {
    return this.userService
      .register(body)
      .then((user) => {
        session.userId = user.id;
        return user;
      })
      .catch((err) => {
        switch (err.response?.statusCode) {
          case 400:
            throw new BadRequestException(err.response?.message);
          default:
            throw new InternalServerErrorException(
              'Something went wrong while registering a new user',
            );
        }
      });
  }

  @Post('/login')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'The user was successfully logged in',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiUnauthorizedResponse({ description: 'Incorrect credentials' })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong while logging in the user',
  })
  async login(@Body() body: UserCredentialsDto, @Session() session: any) {
    return this.userService
      .login(body.email, body.password)
      .then((user) => {
        session.userId = user.id;
        return user;
      })
      .catch((err) => {
        switch (err.response?.statusCode) {
          case 404:
            throw new NotFoundException('User not found');
          case 401:
            throw new UnauthorizedException('Incorrect credentials');
          default:
            throw new InternalServerErrorException(
              'Something went wrong while logging in the user',
            );
        }
      });
  }
  @Patch('/reset-password')
  @HttpCode(200)
  @ApiOkResponse({
    description: 'User password resetted successfully',
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({
    description: 'Invalid token || Failed to reset password ',
  })
  @ApiInternalServerErrorResponse({
    description: 'Something went wrong while resetting password',
  })
  async resetPassword(@Body() body: PasswordResetDto, @Session() session: any) {
    session.userId = null;
    return this.userService
      .resetPassword(body.token, body.newPassword)
      .then((res) => res)
      .catch((error) => {
        switch (error.response?.statusCode) {
          case 400:
            throw new BadRequestException(error.response?.message);
          case 404:
            throw new NotFoundException(error.response?.message);
          default:
            throw new InternalServerErrorException(
              'Something went wrong while resetting password',
            );
        }
      });
  }

  @Get('whoami')
  @UseGuards(AuthGuard)
  @ApiOkResponse({ description: 'The user was successfully found' })
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Post('/logout')
  @HttpCode(200)
  @ApiOkResponse({ description: 'The user was successfully logged out' })
  logOut(@Session() session: any) {
    session.userId = null;
  }
}
