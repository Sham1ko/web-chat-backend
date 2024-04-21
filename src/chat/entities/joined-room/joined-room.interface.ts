import { IUser } from 'src/modules/users/infrastructure/persistence/user.interface';
import { IRoom } from '../room/room.interface';

export interface IJoinedRoom {
  socketId: string;
  users: IUser[];
  room: IRoom;
}
