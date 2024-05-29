import { Injectable } from '@nestjs/common';
import { InjectModel } from 'src/transformers/model.transformer';
import { RoomModel } from '../models/room.model';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(RoomModel)
    private roomModel: ReturnModelType<typeof RoomModel>,
  ) {}

  async create(room, creator) {
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

  async addCreatorToRoom(room, creator) {
    room.users.push(creator);
    return room;
  }
}
