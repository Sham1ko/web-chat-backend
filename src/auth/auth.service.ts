import { HttpException, Injectable } from '@nestjs/common';
import ms from 'ms';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayloadType, Tokens } from './types';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
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
    await this.usersService.create({
      email,
      username,
      password,
    });
  }

  async login(AuthLoginDto: AuthLoginDto) {
    const user = await this.usersService.findOneByEmail(AuthLoginDto.email);

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const isValidPassword = await bcrypt.compare(
      AuthLoginDto.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new HttpException('Password is incorrect', 401);
    }

    const tokens = await this.getTokens(user.id, user.email);

    return tokens;
  }

  private async getTokens(userId: number, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayloadType = {
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
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
