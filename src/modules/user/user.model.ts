import { modelOptions, prop, DocumentType } from '@typegoose/typegoose';
import { BaseModel } from 'src/shared/model/base.model';
import { getProviderByTypegooseClass } from 'src/transformers/model.transformer';

export type UserDocument = DocumentType<UserModel>;

@modelOptions({ schemaOptions: { collection: 'users' } })
export class UserModel extends BaseModel {
  @prop({ required: true, unique: true, trim: true })
  username!: string;

  @prop({ type: String, unique: true, trim: true })
  email: string;

  @prop({
    select: false,
    get(val) {
      return val;
    },
    required: true,
  })
  password!: string;

  @prop()
  avatarUrl: string;
}

export const UserModelProvider = getProviderByTypegooseClass(UserModel);
