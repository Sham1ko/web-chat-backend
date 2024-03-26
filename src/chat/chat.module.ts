import { Module } from '@nestjs/common';
import { ChatGateway } from './gateways/chat.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ConnectedUser,
  ConnectedUserSchema,
  JoinedRoom,
  JoinedRoomSchema,
  Message,
  MessageSchema,
  Room,
  RoomSchema,
} from './entities';
import { MessageService } from './services/message/message.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Message.name,
        schema: MessageSchema,
      },
      {
        name: Room.name,
        schema: RoomSchema,
      },
      {
        name: ConnectedUser.name,
        schema: ConnectedUserSchema,
      },
      {
        name: JoinedRoom.name,
        schema: JoinedRoomSchema,
      },
    ]),
  ],
  providers: [ChatGateway, MessageService],
})
export class ChatModule {}
