// import { User } from 'src/modules/users/domain/user';

export type LoginResponseType = Readonly<{
  accessToken: string;
  refreshToken: string;
  // userData: User;
}>;
