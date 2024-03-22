import { IUser } from 'src/users/entities/user.interface';
import { IMessage } from '../message/message.interface';

export interface IRoom {
  name: string;
  users: IUser[];
  joinedUsers: string[];
  messages: IMessage[];
  createdAt: Date;
}
