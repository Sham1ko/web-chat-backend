import { IUser } from 'src/users/infrastructure/persistense/user.interface';

export interface IConnectedUser {
  id?: number;
  socketId: string;
  user: IUser;
}
