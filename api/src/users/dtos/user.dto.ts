import { Expose } from 'class-transformer';
import { ACCOUNT_TYPE } from '../../utils/enums';

export class UserDto {
  @Expose()
  id: number;
  @Expose()
  email: string;
  @Expose()
  firstName: string;
  @Expose()
  lastName: string;
  @Expose()
  accountType: ACCOUNT_TYPE;
  @Expose()
  createdAt: Date;
  @Expose()
  updatedAt: Date;
}
