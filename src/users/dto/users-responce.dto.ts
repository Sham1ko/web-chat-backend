import { Expose, Exclude } from 'class-transformer';

export class UsersResponseDto {
  @Expose()
  _id: string;

  @Expose()
  username: string;

  @Expose()
  email: number;

  @Exclude()
  password: string;
}
