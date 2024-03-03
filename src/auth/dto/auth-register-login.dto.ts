import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthRegisterLoginDto {
  @ApiProperty({
    required: true,
    title: 'Email',
    type: String,
    description: 'The email of the user',
    example: 'test@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,

    title: 'Username',
    type: String,
    description: 'The username of the user',
    example: 'testuser',
  })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    required: true,

    title: 'Password',
    type: String,
    description: 'The password of the user',
    example: 'password123',
  })
  @IsNotEmpty()
  password: string;
}
