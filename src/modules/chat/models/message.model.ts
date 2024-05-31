import { ModelOptions, Prop } from '@typegoose/typegoose';
import { getProviderByTypegooseClass } from 'src/transformers/model.transformer';

@ModelOptions({ schemaOptions: { timestamps: true, collection: 'messages' } })
export class MessageModel {
  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  chatId: string;

  @Prop()
  createdAt: Date;
}

export const MessageModelProvider = getProviderByTypegooseClass(MessageModel);
