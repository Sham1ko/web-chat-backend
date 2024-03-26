import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IJoinedRoom, JoinedRoom, JoinedRoomDocument } from 'src/chat/entities';

@Injectable()
export class JoinedRoomService {
  constructor(
    @InjectModel(JoinedRoom.name)
    private readonly JoinedRoomModel: Model<JoinedRoomDocument>,
  ) {}

  async create(joinedRoom: IJoinedRoom) {
    return await this.JoinedRoomModel.create(joinedRoom);
  }

  async findByUserId(userId: string) {
    return await this.JoinedRoomModel.find({ userId }).exec();
  }

  async findByRoomId(roomId: string) {
    return await this.JoinedRoomModel.findById(roomId).exec();
  }

  async deleteBySocketId(socketId: string) {
    return await this.JoinedRoomModel.deleteOne({ socketId });
  }
}
