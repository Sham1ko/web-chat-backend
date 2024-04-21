import { User } from 'src/modules/users/domain/user';

export type JwtRefreshPayloadType = {
  sub: User['id'];
  email: User['email'];
  iat: number;
  exp: number;
};
