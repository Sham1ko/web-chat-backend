import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Exclude } from 'class-transformer';
import { EntityDocumentHelper } from 'src/utils/document-entity-helper';

export type UserSchemaDocument = HydratedDocument<UserSchemaClass>;

@Schema({
  collection: 'users',
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class UserSchemaClass extends EntityDocumentHelper {
  @Prop({ type: String, unique: true })
  username: string;

  @Prop({ type: String, unique: true })
  email: string;

  @Prop()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Prop({ default: null })
  @Exclude({ toPlainOnly: true })
  rtHash: string;

  @Prop()
  avatarUrl: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserSchemaClass);
