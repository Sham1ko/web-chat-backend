import { Prop } from '@nestjs/mongoose';

export class Message {
  @Prop()
  content: string;

  @Prop()
  sender: string;

  @Prop()
  createdAt: Date;
}
