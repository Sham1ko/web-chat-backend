import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import * as bcrypt from 'bcrypt';
import { Tokens, JwtPayload } from './types';
import { UserService } from '../user/user.service';
import { SessionService } from '../session/session.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private sessionService: SessionService,
  ) {}

  /**
   * Function to register a new user.
   * @param {Object} AuthRegisterDto - AuthRegisterDto object containing user details, including password.
   * @param AuthRegisterDto.email - The email of the user.
   * @param AuthRegisterDto.username - The username of the user.
   * @param AuthRegisterDto.password - The password of the user.
   */
  async register(AuthRegisterDto: AuthRegisterDto): Promise<void> {
    const { email, password, username } = AuthRegisterDto;
    await this.userService.create({
      email,
      username,
      password,
    });
  }

  async login(AuthLoginDto: AuthLoginDto) {
    const user = await this.userService.findOne(
      {
        email: AuthLoginDto.email,
      },
      '+password',
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isValidPassword = await bcrypt.compare(
      AuthLoginDto.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new BadRequestException('Password is incorrect');
    }

    const { accessToken, refreshToken } = await this.generateTokens(
      user.id,
      user.email,
    );

    await this.sessionService.create(user.id, refreshToken);

    return { accessToken, refreshToken, userData: user };
  }

  private async generateTokens(userId: string, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.sign(jwtPayload, {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION,
      }),
      this.jwtService.sign(jwtPayload, {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET,
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(request: Request): Promise<Tokens> {
    const authorizationHeader = request.headers.authorization;
    const refreshToken = authorizationHeader.split(' ')[1];
    const { sub: _id } = this.jwtService.decode(refreshToken) as JwtPayload;
    const user = await this.userService.findOne({ _id });
    if (!user) {
      throw new ForbiddenException('Access Denied');
    }

    const session = await this.sessionService.findSessionByUserId(user.id);
    const isValidRefreshToken = await bcrypt.compare(
      refreshToken,
      session.hash,
    );
    if (!isValidRefreshToken) throw new ForbiddenException('Access Denied');

    const tokens = await this.generateTokens(user.id, user.email);
    await this.sessionService.delete(user.id);
    await this.sessionService.create(user.id, tokens.refreshToken);

    return tokens;
  }

  async logout(request: Request) {
    const authorizationHeader = request.headers.authorization;
    const refreshToken = authorizationHeader.split(' ')[1];
    const { sub: _id } = this.jwtService.decode(refreshToken) as JwtPayload;

    const user = await this.userService.findOne({ _id });
    if (!user) throw new ForbiddenException('Access Denied');

    await this.sessionService.delete(user.id);
  }

  async me(request: Request) {
    const authorizationHeader = request.headers.authorization;
    const accessToken = authorizationHeader.split(' ')[1];
    const { sub: _id } = this.jwtService.decode(accessToken) as JwtPayload;
    const user = await this.userService.findOne({ _id });
    return user;
  }
}
