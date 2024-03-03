import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthLoginDto } from './dto/auth-login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: AuthRegisterDto })
  @ApiResponse({
    status: 201,
    description: 'User has been successfully created.',
  })
  @ApiResponse({
    status: 409,
    description: 'User with this email already exists',
  })
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() dto: AuthRegisterDto): Promise<void> {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: AuthLoginDto): any {
    return this.authService.login(dto);
  }
}
