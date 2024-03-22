import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserPersistenceModule } from './infrastructure/persistense/user-persistence.module';

@Module({
  imports: [UserPersistenceModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, UserPersistenceModule],
})
export class UsersModule {}
