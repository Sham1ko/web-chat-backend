import { IUser } from 'src/users/infrastructure/persistense/user.interface';
import { IMessage } from '../message/message.interface';

export interface IRoom {
  name: string;
  users: IUser[];
  joinedUsers: string[];
  messages: IMessage[];
  createdAt: Date;
}
