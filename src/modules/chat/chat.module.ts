import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageService } from './services/message.service';
import { MessageProvider } from './models/message.model';

@Module({
  imports: [],
  providers: [ChatGateway, MessageService, MessageProvider],
  exports: [MessageService],
})
export class ChatModule {}
