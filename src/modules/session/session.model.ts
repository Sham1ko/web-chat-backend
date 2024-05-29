import { ModelOptions, Prop } from '@typegoose/typegoose';
import { BaseModel } from 'src/shared/model/base.model';
import { getProviderByTypegooseClass } from 'src/transformers/model.transformer';

@ModelOptions({ schemaOptions: { collection: 'sessions' } })
export class SessionModel extends BaseModel {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  hash: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;

  @Prop()
  deletedAt: Date;
}

export const SessionModelProvider = getProviderByTypegooseClass(SessionModel);
