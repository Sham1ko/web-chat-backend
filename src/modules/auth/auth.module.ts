import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtRefreshStrategy, JwtStrategy],
})
export class AuthModule {}
