import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiHideProperty } from '@nestjs/swagger';

@Schema()
export class User {
  @ApiHideProperty()
  _id: string;

  @Prop({ type: String, unique: true })
  username: string;

  @Prop({ type: String, unique: true })
  email: string;

  @ApiHideProperty()
  @Prop()
  password: string;

  @Prop({ default: null })
  rtHash: string;

  @Prop()
  avatarUrl: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
