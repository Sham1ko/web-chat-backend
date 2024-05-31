import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageService } from './services/message.service';
import { MessageModelProvider } from './models/message.model';
import { ChatController } from './chat.controlller';
import { ChatModelProvider } from './models/chat.model';
import { ChatService } from './services/chat.service';

@Module({
  imports: [],
  controllers: [ChatController],
  providers: [
    MessageService,
    MessageModelProvider,
    ChatService,
    ChatModelProvider,
    ChatGateway,
  ],
  exports: [MessageService],
})
export class ChatModule {}
