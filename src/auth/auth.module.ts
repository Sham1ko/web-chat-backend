import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { RtStrategy } from './strategies/rt.strategy';
import { JwtStrategy } from './strategies/at.strategy';

@Module({
  imports: [UsersModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, RtStrategy, JwtStrategy],
})
export class AuthModule {}
