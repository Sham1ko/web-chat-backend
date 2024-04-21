import { Exclude, Expose } from 'class-transformer';

@Exclude()
class UserDataDto {
  @Expose()
  _id: string;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Exclude({ toPlainOnly: true })
  password: string;

  @Exclude({ toPlainOnly: true })
  rtHash: string;

  @Exclude({ toPlainOnly: true })
  __v: number;
}

@Exclude()
export class AuthLoginResponseDto {
  @Expose()
  tokens: any;

  @Expose()
  userData: UserDataDto;
}
