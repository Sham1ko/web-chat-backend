import { modelOptions } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: {
      updatedAt: false,
    },
    versionKey: false,
  },
})
export class BaseModel {
  id: string;
  createdAt?: Date;

  static get protectedKeys() {
    return ['_id', 'createdAt', '__v'];
  }
}
