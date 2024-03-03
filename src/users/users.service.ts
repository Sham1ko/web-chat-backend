import { Injectable, Logger, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './user.schema';
import { PublicUser } from './dto/IUser';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  /**
   * Create a new user in the database with hashed password.
   * @param body - CreateUserDto object containing user details, including password.
   * @returns A Promise that resolves to the newly created user.
   * @throws An error if the input is invalid or if an error occurs during user creation.
   */
  async create(body: CreateUserDto): Promise<PublicUser> {
    try {
      const user = await this.userModel.findOne({ email: body.email }).exec();
      if (user) {
        throw new ConflictException('User with this email already exists');
      }

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(body.password, salt);

      const newUser: CreateUserDto = {
        ...body,
        password: hashedPassword,
      };
      const createdUser = await this.userModel.create(newUser);

      const publicUser = {
        _id: createdUser._id,
        username: createdUser.username,
        email: createdUser.email,
      };

      return publicUser;
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async findOneByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({
      email,
    });
  }
}
