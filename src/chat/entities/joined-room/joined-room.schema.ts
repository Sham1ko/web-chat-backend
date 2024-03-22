import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class JoinedRoom {
  @Prop()
  socketId: string;

  @Prop()
  users: string[];

  @Prop()
  room: string;
}

export type JoinedRoomDocument = JoinedRoom & Document;
export const JoinedRoomSchema = SchemaFactory.createForClass(JoinedRoom);
