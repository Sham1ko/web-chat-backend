import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserDocumentRepository } from './user.document.repository';
import {
  UserSchema,
  UserSchemaClass,
} from 'src/modules/users/infrastructure/persistence/user.schema';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserSchemaClass.name, schema: UserSchema },
    ]),
  ],
  providers: [
    {
      provide: UserRepository,
      useClass: UserDocumentRepository,
    },
  ],
  exports: [UserRepository],
})
export class UserPersistenceModule {}
