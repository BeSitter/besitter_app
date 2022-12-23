import { User } from 'src/users/entities/user.entity';
import {
  ACADEMIC_LEVEL,
  ACCOUNT_STATUS,
  ADDITIONAL_CHARACTERISTIC,
  XP_TYPE,
  CHARACTERISTIC,
  PROPOSED_SERVICES,
  BADGE,
} from 'src/utils/enums';
import { AVAILABILITY_PERIOD } from 'src/utils/types';
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
export class SitterAccount {
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
    name: 'date_of_birth',
    type: 'date',
    nullable: false,
  })
  dateOfBirth: Date;

  @Column({
    name: 'bio',
    type: 'varchar',
    length: 1000,
    nullable: false,
  })
  bio: string;

  @Column({
    name: 'account_status',
    type: 'enum',
    enum: ACCOUNT_STATUS,
    default: ACCOUNT_STATUS.PENDING_CONFIRMATION,
    nullable: false,
  })
  accountStatus: ACCOUNT_STATUS;

  @Column({
    name: 'profile_completion_progress',
    type: 'decimal',
    default: 0,
    nullable: false,
  })
  profileCompletionProgress: number;

  @Column({
    name: 'is_kyc_completed',
    type: 'boolean',
    default: false,
    nullable: false,
  })
  isKycCompleted: boolean;

  @Column({
    name: 'spoken_languages',
    type: 'simple-array',
    nullable: false,
  })
  spokenLanguages: string[];

  @Column({
    name: 'hourly_rate',
    type: 'decimal',
    nullable: false,
  })
  hourlyRate: number;

  @Column({
    name: 'availability_periods',
    type: 'simple-json',
    nullable: false,
  })
  availabilityPeriods: Array<AVAILABILITY_PERIOD>;

  @Column({
    name: 'is_email_verified',
    type: 'boolean',
    nullable: false,
    default: false,
  })
  isEmailVerified: boolean;

  @Column({
    name: 'profile_picture',
    type: 'varchar',
    nullable: false,
  })
  profilePicture: string;

  @Column({
    name: 'proposed_services',
    type: 'simple-array',
    nullable: false,
  })
  proposedServices: Array<PROPOSED_SERVICES>;

  // NULL FIELDS
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

  @Column({
    name: 'highest_academic_level',
    type: 'enum',
    enum: ACADEMIC_LEVEL,
    nullable: true,
  })
  highestAcademicLevel: ACADEMIC_LEVEL;

  @Column({
    name: 'years_of_xp',
    type: 'int',
    nullable: true,
  })
  yearsOfXp: number;

  @Column({
    name: 'xp_types',
    type: 'simple-array',
    nullable: true,
  })
  xpTypes: Array<XP_TYPE>;

  @Column({
    name: 'client_with_special_need_xp',
    type: 'boolean',
    nullable: true,
  })
  clientWithSpecialNeedXp: boolean;

  @Column({
    name: 'characteristics',
    type: 'simple-array',
    nullable: true,
  })
  characteristics: Array<CHARACTERISTIC>;

  @Column({
    name: 'additional_characteristics',
    type: 'simple-array',
    nullable: true,
  })
  additionalCharacteristics: Array<ADDITIONAL_CHARACTERISTIC>;

  @Column({
    name: 'official_identity_document',
    type: 'varchar',
    nullable: true,
  })
  officialIdentityDocument: string;

  @Column({
    name: 'criminal_record_document',
    type: 'varchar',
    nullable: true,
  })
  criminalRecordDocument: string;

  @Column({
    name: 'is_criminal_record_document_verified',
    type: 'boolean',
    nullable: true,
  })
  isCriminalRecordDocumentVerified: boolean;

  @Column({
    name: 'bafa_certificate',
    type: 'varchar',
    nullable: true,
  })
  bafaCertificate: string;

  @Column({
    name: 'is_bafa_certificate_verified',
    type: 'boolean',
    nullable: true,
  })
  isBafaCertificateVerified: boolean;

  @Column({
    name: 'first_aid_certificate',
    type: 'varchar',
    nullable: true,
  })
  firstAidCertificate: string;

  @Column({
    name: 'is_first_aid_certificate_verified',
    type: 'boolean',
    nullable: true,
  })
  isFirstAidCertificateVerified: boolean;

  @Column({
    name: 'badges',
    type: 'simple-array',
    nullable: true,
  })
  badges: Array<BADGE>;

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
    console.log('Sitter account inserted:', this);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Sitter account updated:', this);
  }

  @AfterRemove()
  logRemove() {
    console.log('Sitter account removed:', this);
  }
}
