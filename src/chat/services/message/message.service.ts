import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Message, MessageDocument } from '../../entities';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async create(message: Message) {
    console.log(message);
    const newMessage = await this.messageModel.create(message);
    console.log('New message created:', newMessage);
  }

  async getMessages() {
    const messages = await this.messageModel.find().exec();
    return messages;
  }
}
