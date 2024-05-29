import { index, modelOptions, prop } from '@typegoose/typegoose';
import { BaseModel } from 'src/shared/model/base.model';
import { getProviderByTypegooseClass } from 'src/transformers/model.transformer';

@modelOptions({ schemaOptions: { collection: 'contacts' } })
@index({ userId: 1, contactId: 1 }, { unique: true })
export class ContactModel extends BaseModel {
  @prop({ required: true, index: true })
  userId: string;

  @prop({ required: true })
  contactId: string;

  @prop({ default: Date.now })
  addedAt: Date;

  @prop()
  nickname: string;
}

export const ContactsModelProvider = getProviderByTypegooseClass(ContactModel);
