import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthLoginDto {
  @ApiProperty({
    required: true,
    title: 'Email',
    type: String,
    description: 'The email of the user',
    example: 'test@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({
    required: true,

    title: 'Password',
    type: String,
    description: 'The password of the user',
    example: 'password123',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
