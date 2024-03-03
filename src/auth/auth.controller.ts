import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: AuthRegisterLoginDto })
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
  register(@Body() dto: AuthRegisterLoginDto): Promise<void> {
    return this.authService.register(dto);
  }
}
