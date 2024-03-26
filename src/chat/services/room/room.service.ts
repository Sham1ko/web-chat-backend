import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRoom, Room, RoomDocument } from 'src/chat/entities';
import { IUser } from 'src/users/infrastructure/persistense/user.interface';

@Injectable()
export class RoomService {
  constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>) {}

  async create(room: IRoom, creator: IUser) {
    const newRoom = await this.addCreatorToRoom(room, creator);
    await this.roomModel.create(newRoom);
    console.log('New room created:', newRoom);
  }

  async getRoom(roomIdL: string) {
    const room = await this.roomModel.findById(roomIdL).exec();
    return room;
  }

  async getRoomsForUser(userId: string) {
    const rooms = await this.roomModel.find({ 'users._id': userId }).exec();
    return rooms;
  }

  async addCreatorToRoom(room: IRoom, creator: IUser): Promise<IRoom> {
    room.users.push(creator);
    return room;
  }
}
