import { Module } from '@nestjs/common';
import { ChatsService } from './chat.service';
import { ChatGateway } from './chat.gateway';

@Module({
  providers: [ChatsService, ChatGateway],
})
export class ChatsModule {}
