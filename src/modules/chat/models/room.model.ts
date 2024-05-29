import { ModelOptions, Prop } from '@typegoose/typegoose';

@ModelOptions({ schemaOptions: { timestamps: true, collection: 'rooms' } })
export class RoomModel {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  users: any[];
}
