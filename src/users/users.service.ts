import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './domain/user';
import { UserRepository } from './infrastructure/persistense/user.repository';
@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UserRepository) {}

  /**
   * Create a new user in the database with hashed password.
   * @param body - CreateUserDto object containing user details, including password.
   * @returns A Promise that resolves to the newly created user.
   * @throws An error if the input is invalid or if an error occurs during user creation.
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const clonedPayload = {
        ...createUserDto,
      };

      const salt = await bcrypt.genSalt();
      clonedPayload.password = await bcrypt.hash(clonedPayload.password, salt);

      if (clonedPayload.email) {
        const userObject = await this.usersRepository.findOne({
          email: clonedPayload.email,
        });
        if (userObject) {
          throw new HttpException(
            {
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              errors: {
                email: 'emailAlreadyExists',
              },
            },
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
      }

      return await this.usersRepository.create(clonedPayload);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async getUserByField(fields): Promise<User> {
    const user = await this.usersRepository.findOne(fields);
    return user;
  }

  async updateRefreshTokenHash(userId: string, rtHash: string) {
    await this.usersRepository.update(userId, { rtHash });
  }
}
