import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEnum,
  IsJWT,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import {
  ACADEMIC_LEVEL,
  ACCOUNT_TYPE,
  ADDITIONAL_CHARACTERISTIC,
  XP_TYPE,
  CHARACTERISTIC,
  PROPOSED_SERVICES,
  TIMEFRAME,
} from 'src/utils/enums';
import { AVAILABILITY_PERIOD } from 'src/utils/types';

export class CreateUserDto {
  // REQUIRED
  @ApiProperty({
    type: String,
    description: 'token sent to the user',
    default: 'thisisavalidtokencontainingusersemailaddress.pleasereplaceme',
  })
  @IsJWT()
  @IsNotEmpty()
  token: string; // user table

  @ApiProperty({
    type: String,
    description: "user's password",
    default: '123456',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(200)
  password: string; // user table

  @ApiProperty({
    type: String,
    description: "user's first name",
    default: 'John',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  firstName: string; // user table

  @ApiProperty({
    type: String,
    description: "user's last name",
    default: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  lastName: string; // user table

  @ApiProperty({
    type: String,
    description: "user's account type",
    enum: ACCOUNT_TYPE,
    default: ACCOUNT_TYPE.CLIENT,
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(ACCOUNT_TYPE)
  accountType: ACCOUNT_TYPE; // users table

  @ApiProperty({
    type: String,
    description: "user's country",
    default: 'France',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  country: string; // sitter-account (required) + client(required) table

  @ApiProperty({
    type: String,
    description: "user's city",
    default: 'Nantes',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  city: string; // sitter-account (required) + client(required) table

  @ApiProperty({
    type: String,
    description: "user's address",
    default: '20 Somewhere around the world',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  address: string; // sitter-account (required) + client(required) table

  @ApiProperty({
    type: String,
    description: "user's postal code",
    default: '44300',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  postalCode: string; // sitter-account (required) + client(required) table

  // OPTIONAL
  @ApiProperty({
    type: Date,
    description: "user's date of birth",
    default: '1998-06-23',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  dateOfBirth: Date; // sitter-account (required) table

  @ApiProperty({
    type: String,
    description: "user's bio",
    default: 'My name is John Doe',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  @IsOptional()
  bio: string; // sitter-account (required) table

  @ApiProperty({
    type: Array<string>,
    description: "user's list of spoken languages",
    default: ['french', 'english'],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsOptional()
  spokenLanguages: Array<string>; // sitter-account (required) table

  @ApiProperty({
    type: Number,
    description: "user's hourly rate",
    default: 9.5,
  })
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  hourlyRate: number; // sitter-account (required) table

  @ApiProperty({
    type: Array<AVAILABILITY_PERIOD>,
    description: "user's list of availability periods",
    default: [
      { week_day: 1, timeframes: [TIMEFRAME.MORNING, TIMEFRAME.AFTERNOON] },
      {
        week_day: 2,
        timeframes: [
          TIMEFRAME.MORNING,
          TIMEFRAME.AFTERNOON,
          TIMEFRAME.EVENING,
          TIMEFRAME.NIGHT,
        ],
      },
    ],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsOptional()
  availabilityPeriods: Array<AVAILABILITY_PERIOD>; // sitter-account (required) table

  @ApiProperty({
    type: String,
    description: "user's profile picture url",
    default: 'http://besitter.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  profilePicture: string; // sitter-account (required) + client (optional) table

  @ApiProperty({
    type: Array<PROPOSED_SERVICES>,
    description: "user's proposed services",
    default: [PROPOSED_SERVICES.COOKING, PROPOSED_SERVICES.LANGUAGES],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsOptional()
  proposedServices: Array<PROPOSED_SERVICES>; // sitter-account (required) table

  @ApiProperty({
    type: String,
    description: "user's phone number",
    default: '+33650578840',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  @IsOptional()
  phoneNumber: string; // sitter-account (optional) + client (optional) table

  @ApiProperty({
    type: String,
    description: "user's highest academic level",
    enum: ACADEMIC_LEVEL,
    default: ACADEMIC_LEVEL.BREVET,
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(ACADEMIC_LEVEL)
  @IsOptional()
  highestAcademicLevel: ACADEMIC_LEVEL; // sitter-account (optional) table

  @ApiProperty({
    type: Number,
    description: "user's years of experience",
    default: 0,
  })
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  yearsOfXp: number; // sitter-account (optional) table

  @ApiProperty({
    type: Array<XP_TYPE>,
    description: "user's list of experience types",
    default: [XP_TYPE.BABY, XP_TYPE.GRADESCHOOLER],
  })
  @IsArray()
  @IsString({ each: true })
  @ArrayNotEmpty()
  @IsOptional()
  xpTypes: Array<XP_TYPE>; // sitter-account (optional) table

  @ApiProperty({
    type: Boolean,
    description:
      'wheither the user has experience with a client with special needs or not',
    default: false,
  })
  @IsBoolean()
  @IsOptional()
  clientWithSpecialNeedXp: boolean; // sitter-account (optional) table

  @ApiProperty({
    type: Array<CHARACTERISTIC>,
    description: "user's characteristics",
    default: [CHARACTERISTIC.ENTHOUSIASTIC],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsOptional()
  characteristics: Array<CHARACTERISTIC>; // sitter-account (optional) table

  @ApiProperty({
    type: Array<ADDITIONAL_CHARACTERISTIC>,
    description: "user's additional characteristics",
    default: [
      ADDITIONAL_CHARACTERISTIC.BAFA_CERTIFICATE,
      ADDITIONAL_CHARACTERISTIC.DRIVER_LICENSE,
      ADDITIONAL_CHARACTERISTIC.CAR_OWNER,
    ],
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsOptional()
  additionalCharacteristics: Array<ADDITIONAL_CHARACTERISTIC>; // sitter-account (optional) table

  @ApiProperty({
    type: String,
    description: "user's official identity document url",
    default: 'http://besitter.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  officialIdentityDocument: string; // sitter-account (optional) table

  @ApiProperty({
    type: String,
    description: "user's criminal record document url",
    default: 'http://besitter.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  criminalRecordDocument: string; // sitter-account (optional) table

  @ApiProperty({
    type: String,
    description: "user's bafa certificate url",
    default: 'http://besitter.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  bafaCertificate: string; // sitter-account (optional) table

  @ApiProperty({
    type: String,
    description: "user's first aid certificate url",
    default: 'http://besitter.com',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  firstAidCertificate: string; // sitter-account (optional) table
}
