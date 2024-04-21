// contacts.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { ContactSchemaClass, ContactsSchema } from './contacts.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ContactSchemaClass.name,
        schema: ContactsSchema,
      },
    ]),
  ],
  controllers: [ContactsController],
  providers: [ContactsService],
})
export class ContactsModule {}
