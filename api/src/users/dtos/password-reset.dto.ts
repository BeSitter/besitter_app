import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class PasswordResetDto {
  @ApiProperty({
    type: String,
    description: "user's new password",
    default: '987654321',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  newPassword: string;

  @ApiProperty({
    type: String,
    description: 'the valid jwt token which includes the email of the user',
    default:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InlpbWthYm9zc0BnbWFpbC5jb20iLCJpYXQiOjE2NDgzMTIwMTQsImV4cCI6MTY0ODMxNTYxNH0.slrCrnE_1WKyrM5-IBu3gxnbymX5X_CzQwviNolBWeI',
  })
  @IsNotEmpty()
  @IsJWT()
  token: string;
}
