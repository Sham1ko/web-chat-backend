import { Body, Controller, Get, Post } from '@nestjs/common';
import { ChatService } from './services/chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async createChat(@Body() createChatDto) {
    return await this.chatService.createChat(createChatDto);
  }

  @Get()
  async getChats() {
    return await this.chatService.getChats();
  }
}
