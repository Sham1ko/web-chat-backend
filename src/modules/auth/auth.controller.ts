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
import {
  ApiBearerAuth,
  ApiBody,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthLoginResponseDto } from './dto/auth-login-response.dto';
// import { LoginResponseType } from './types/login-response.type';
import { User } from 'src/modules/users/domain/user';
import { LoginResponseType } from './types/login-response.type';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: AuthRegisterDto })
  @Post('register')
  @HttpCode(HttpStatus.NO_CONTENT)
  register(@Body() registerDto: AuthRegisterDto): Promise<void> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginDto: AuthLoginDto) {
    return this.authService.login(loginDto);
  }

  // @Post('refresh')
  // @UseGuards(AuthGuard('jwt-refresh'))
  // @HttpCode(HttpStatus.OK)
  // public refresh(
  //   @Request() request,
  // ): Promise<Omit<LoginResponseType, 'userData'>> {
  //   return this.authService.refreshTokens(request);
  // }

  // @Post('logout')
  // @UseGuards(AuthGuard('jwt'))
  // @HttpCode(HttpStatus.OK)
  // public logout(@Request() request): Promise<void> {
  //   return this.authService.logout(request);
  // }

  // @Get('me')
  // @UseGuards(AuthGuard('jwt'))
  // @HttpCode(HttpStatus.OK)
  // public me(@Request() request): Promise<User> {
  //   return this.authService.me(request);
  // }
}
