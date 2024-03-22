import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema, RoomSchema } from './entities';
import { MessageService } from './services/message/message.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Message',
        schema: MessageSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: 'Room',
        schema: RoomSchema,
      },
    ]),
  ],
  providers: [ChatGateway, MessageService],
})
export class ChatModule {}
