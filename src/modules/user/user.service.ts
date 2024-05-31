import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserModel } from './user.model';
import { InjectModel } from 'src/transformers/model.transformer';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel)
    private readonly userModel: ReturnModelType<typeof UserModel>,
  ) {}

  async create(createUserDto) {
    try {
      const clonedPayload = {
        ...createUserDto,
      };

      const salt = await bcrypt.genSalt();
      clonedPayload.password = await bcrypt.hash(clonedPayload.password, salt);

      if (clonedPayload.email) {
        const userObject = await this.userModel.findOne({
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

      return await this.userModel.create(clonedPayload);
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(field, select?) {
    return await this.userModel.findOne(field).select(select);
  }
}
