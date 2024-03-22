import { IUser } from 'src/users/entities/user.interface';
import { IRoom } from '../room/room.interface';

export interface IJoinedRoom {
  socketId: string;
  users: IUser[];
  room: IRoom;
}
