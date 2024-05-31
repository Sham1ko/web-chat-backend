import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ChatModel } from '../models/chat.model';
import { InjectModel } from 'src/transformers/model.transformer';

@Injectable()
export class ChatService {
  constructor(@InjectModel(ChatModel) private chatModel: Model<ChatModel>) {}

  async createChat(createChatDto) {
    const createdChat = new this.chatModel(createChatDto);
    return await createdChat.save();
  }

  async getChats() {
    return await this.chatModel.find().exec();
  }
}
