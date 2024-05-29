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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtRefreshAuthGuard } from 'src/common/guards/auth.guard';
@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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

  @Post('refresh')
  @UseGuards(new JwtRefreshAuthGuard())
  @HttpCode(HttpStatus.OK)
  public refresh(@Request() request) {
    return this.authService.refreshTokens(request);
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  public logout(@Request() request) {
    return this.authService.logout(request);
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  public me(@Request() request) {
    return this.authService.me(request);
  }
}
