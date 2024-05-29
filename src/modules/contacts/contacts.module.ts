// contacts.module.ts

import { Module } from '@nestjs/common';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { ContactsModelProvider } from './contacts.model';

@Module({
  imports: [],
  controllers: [ContactsController],
  providers: [ContactsModelProvider, ContactsService],
})
export class ContactsModule {}
