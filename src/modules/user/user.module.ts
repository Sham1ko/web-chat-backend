import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserModelProvider } from './user.model';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserModelProvider, UserService],
  exports: [UserService],
})
export class UserModule {}
