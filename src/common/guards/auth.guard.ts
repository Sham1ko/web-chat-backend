import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SessionService } from 'src/modules/session/session.service';

@Injectable()
export class JwtRefreshAuthGuard extends AuthGuard('jwt-refresh') {
  private sessionService: SessionService;
  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    if (err || !user) {
      const refreshToken = context
        .getArgs()[0]
        .headers.authorization.split(' ')[1];
      //   const userId = context.getArgs()[;
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
