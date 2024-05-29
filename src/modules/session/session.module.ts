import { Module } from '@nestjs/common';
import { SessionModelProvider } from './session.model';
import { SessionController } from './session.controller';
import { SessionService } from './session.service';

@Module({
  imports: [],
  controllers: [SessionController],
  providers: [SessionModelProvider, SessionService],
  exports: [SessionService],
})
export class SessionModule {}
