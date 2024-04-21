import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { EntityDocumentHelper } from 'src/utils/document-entity-helper';

export type ContactSchemaDocument = HydratedDocument<ContactSchemaClass>;
@Schema({
  collection: 'contacts',
  timestamps: true,
  toJSON: {
    virtuals: true,
    getters: true,
  },
})
export class ContactSchemaClass extends EntityDocumentHelper {
  @Prop({ required: true, index: true })
  userId: string;

  @Prop({ required: true })
  contactId: string;

  @Prop({ default: Date.now })
  addedAt: Date;

  @Prop()
  nickname: string;
}

export const ContactsSchema = SchemaFactory.createForClass(ContactSchemaClass);

ContactsSchema.index({ userId: 1, contactId: 1 }, { unique: true });
