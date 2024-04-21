import { IUser } from 'src/modules/users/infrastructure/persistence/user.interface';

export interface IConnectedUser {
  id?: number;
  socketId: string;
  user: IUser;
}
