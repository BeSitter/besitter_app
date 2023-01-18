import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsNotEmpty, IsString } from 'class-validator';

export class VerifyTokenDto {
  @ApiProperty({
    type: String,
    description: 'the token sent to the user',
    default: 'eydasdsadsadssadsd',
  })
  @IsString()
  @IsNotEmpty()
  @IsJWT()
  token: string;
}
