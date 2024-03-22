import { IUser } from 'src/users/entities/user.interface';

export interface IConnectedUser {
  id?: number;
  socketId: string;
  user: IUser;
}
