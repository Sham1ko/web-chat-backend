import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Message } from '../message/message.schema';
import { Document } from 'mongoose';
import { User } from 'src/modules/users/domain/user';

export class Room {
  @Prop()
  name: string;

  @Prop()
  users: User[];

  @Prop()
  joinedUsers: User[];

  @Prop()
  messages: Message[];

  @Prop()
  createdAt: Date;
}

export type RoomDocument = Room & Document;
export const RoomSchema = SchemaFactory.createForClass(Room);
