import { User } from 'src/users/entities/user.entity';
import { ACCOUNT_STATUS } from 'src/utils/enums';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ClientAccount {
  // NOT_NULL FIELDS
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(() => User, {
    cascade: ['remove'],
  })
  @JoinColumn()
  user: User;
  @Column({
    name: 'country',
    type: 'varchar',
    length: 200,
    nullable: false,
  })
  country: string;

  @Column({
    name: 'city',
    type: 'varchar',
    length: 200,
    nullable: false,
  })
  city: string;

  @Column({
    name: 'address',
    type: 'varchar',
    length: 200,
    nullable: false,
  })
  address: string;

  @Column({
    name: 'postal_code',
    type: 'varchar',
    length: 200,
    nullable: false,
  })
  postalCode: string;

  @Column({
    name: 'account_status',
    type: 'enum',
    enum: ACCOUNT_STATUS,
    default: ACCOUNT_STATUS.PENDING_CONFIRMATION,
    nullable: false,
  })
  accountStatus: ACCOUNT_STATUS;

  @Column({
    name: 'is_email_verified',
    type: 'boolean',
    nullable: false,
    default: false,
  })
  isEmailVerified: boolean;

  // NULL FIELDS
  @Column({
    name: 'profile_picture',
    type: 'varchar',
    nullable: true,
  })
  profilePicture: string;

  @Column({
    name: 'phone_number',
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  phoneNumber: string;

  @Column({
    name: 'is_phone_number_verified',
    type: 'boolean',
    nullable: true,
  })
  isPhoneNumberVerified: boolean;

  // TIMESTAMPS
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    nullable: false,
  })
  updatedAt: Date;

  @AfterInsert()
  logInsert() {
    console.log('Client account inserted:', this);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Client account updated:', this);
  }

  @AfterRemove()
  logRemove() {
    console.log('Client account removed:', this);
  }
}
