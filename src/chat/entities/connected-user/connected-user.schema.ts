import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/modules/users/domain/user';

@Schema()
export class ConnectedUser {
  @Prop()
  socketId: string;

  @Prop()
  user: User;
}

export type ConnectedUserDocument = ConnectedUser & Document;
export const ConnectedUserSchema = SchemaFactory.createForClass(ConnectedUser);
