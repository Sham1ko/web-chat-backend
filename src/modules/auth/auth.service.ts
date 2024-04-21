import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import * as bcrypt from 'bcrypt';
import { Tokens, JwtPayload } from './types';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
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
    const user = await this.userService.findOne({
      email: AuthLoginDto.email,
    });

    // if (!user) {

    //   throw new HttpException('User not found', 404);
    // }

    // const isValidPassword = await bcrypt.compare(
    //   AuthLoginDto.password,
    //   user.password,
    // );

    // if (!isValidPassword) {
    //   throw new HttpException('Password is incorrect', 401);
    // }

    // const { accessToken, refreshToken } = await this.generateTokens(
    //   user.id,
    //   user.email,
    // );

    // await this.updateRefreshTokenHash(user.id, refreshToken);

    // return { accessToken, refreshToken, userData: user };
    return user;
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
    const { sub: userId } = this.jwtService.decode(refreshToken) as JwtPayload;
    const user = await this.userService.findOne({ id: userId });
    if (!user) throw new ForbiddenException('Access Denied');

    // const isValidRefreshToken = await bcrypt.compare(refreshToken, user.rtHash);
    // if (!isValidRefreshToken) throw new ForbiddenException('Access Denied');

    const tokens = await this.generateTokens(user.id, user.email);
    // await this.updateRefreshTokenHash(user.id, tokens.refreshToken);

    return tokens;
  }

  // async updateRefreshTokenHash(userId: string, refreshToken: string) {
  //   const salt = await bcrypt.genSalt();
  //   const hash = await bcrypt.hash(refreshToken, salt);
  //   await this.userService.updateRefreshTokenHash(userId, hash);
  // }

  // async logout(request: Request) {
  //   const authorizationHeader = request.headers.authorization;
  //   const refreshToken = authorizationHeader.split(' ')[1];
  //   const { sub: userId } = this.jwtService.decode(refreshToken) as JwtPayload;

  //   const user = await this.userService.getUserByField({ id: userId });
  //   console.log(user);
  //   if (!user) throw new ForbiddenException('Access Denied');

  //   await this.userService.updateRefreshTokenHash(user.id, null);
  // }

  // async me(request: Request) {
  //   const authorizationHeader = request.headers.authorization;
  //   const accessToken = authorizationHeader.split(' ')[1];
  //   const { sub: userId } = this.jwtService.decode(accessToken) as JwtPayload;

  //   return this.userService.getUserByField({ id: userId });
  // }
}
