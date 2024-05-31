import { ModelOptions, Prop } from '@typegoose/typegoose';
import { getProviderByTypegooseClass } from 'src/transformers/model.transformer';

@ModelOptions({ schemaOptions: { timestamps: true, collection: 'chats' } })
export class ChatModel {
  @Prop({ required: true })
  user1_id: string;

  @Prop({ required: true })
  user2_id: string;

  @Prop()
  last_message_id: string;
}

export const ChatModelProvider = getProviderByTypegooseClass(ChatModel);
