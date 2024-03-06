import { Prop } from '@nestjs/mongoose';

export class Room {
  @Prop()
  name: string;

  @Prop()
  participants: string[];
}
