import { IUser } from 'src/users/infrastructure/persistense/user.interface';
import { IRoom } from '../room/room.interface';

export interface IJoinedRoom {
  socketId: string;
  users: IUser[];
  room: IRoom;
}
