import { IUser } from 'src/modules/users/infrastructure/persistence/user.interface';
import { IMessage } from '../message/message.interface';

export interface IRoom {
  name: string;
  users: IUser[];
  joinedUsers: string[];
  messages: IMessage[];
  createdAt: Date;
}
