import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @ApiProperty({ example: 'test1@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string | null;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  username: string;
}
