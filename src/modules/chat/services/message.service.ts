import { Injectable } from '@nestjs/common';
import { InjectModel } from 'src/transformers/model.transformer';
import { MessageModel } from '../models/message.model';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(MessageModel)
    private messageModel: ReturnModelType<typeof MessageModel>,
  ) {}

  async create(message: any) {
    console.log(message);
    const newMessage = await this.messageModel.create(message);
    console.log('New message created:', newMessage);
  }

  async getMessages() {
    const messages = await this.messageModel.find().exec();
    return messages;
  }
}
