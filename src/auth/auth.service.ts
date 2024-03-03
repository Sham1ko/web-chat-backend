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

  /**
   * Function to register a new user.
   * @param {Object} AuthRegisterDto - AuthRegisterDto object containing user details, including password.
   * @param AuthRegisterDto.email - The email of the user.
   * @param AuthRegisterDto.username - The username of the user.
   * @param AuthRegisterDto.password - The password of the user.
   */
  async register(AuthRegisterDto: AuthRegisterLoginDto): Promise<void> {
    const { email, password, username } = AuthRegisterDto;
    await this.usersService.create({
      email,
      username,
      password,
    });
  }
}
