import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: AuthRegisterLoginDto): Promise<void> {
    const { email, password, username } = dto;
    const user = await this.usersService.create({
      email,
      username,
      password,
    });
  }
}
