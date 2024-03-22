import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthLoginResponseDto } from './dto/auth-login-response.dto';
import { LoginResponseType } from './types/login-response.type';
import { User } from 'src/users/domain/user';

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
  @HttpCode(HttpStatus.NO_CONTENT)
  register(@Body() registerDto: AuthRegisterDto): Promise<void> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: AuthLoginDto): Promise<LoginResponseType> {
    return this.authService.login(loginDto);
  }

  @Post('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  @HttpCode(HttpStatus.OK)
  public refresh(
    @Request() request,
  ): Promise<Omit<LoginResponseType, 'userData'>> {
    return this.authService.refreshTokens(request);
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  public logout(@Request() request): Promise<void> {
    return this.authService.logout(request);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  public me(@Request() request): Promise<User> {
    return this.authService.me(request);
  }
}
