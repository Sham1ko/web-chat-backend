import { User } from 'src/users/domain/user';

export type LoginResponseType = Readonly<{
  accessToken: string;
  refreshToken: string;
  userData: User;
}>;
