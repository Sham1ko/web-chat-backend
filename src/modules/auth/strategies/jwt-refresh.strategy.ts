import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { OrNeverType } from 'src/utils/types/or-never.type';
import { JwtRefreshPayloadType } from './types/jwt-refresh-payload.type';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
    });
  }
  public validate(
    payload: JwtRefreshPayloadType,
  ): OrNeverType<JwtRefreshPayloadType> {
    if (!payload.email) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
