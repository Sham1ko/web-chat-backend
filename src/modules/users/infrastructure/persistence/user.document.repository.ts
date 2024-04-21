import { Injectable } from '@nestjs/common';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSchemaClass } from 'src/modules/users/infrastructure/persistence/user.schema';
import { UserMapper } from './user.mapper';
import { User } from 'src/modules/users/domain/user';
import { SortUserDto } from 'src/modules/users/dto/query-user.dto';
import { NullableType } from 'src/utils/types/nullable.type';
import { UserRepository } from './user.repository';

@Injectable()
export class UserDocumentRepository extends UserRepository {
  constructor(
    @InjectModel(UserSchemaClass.name)
    private readonly usersModel: Model<UserSchemaClass>,
  ) {
    super();
  }

  async create(data: User): Promise<User> {
    const persistenceModel = UserMapper.toPersistence(data);
    const createdUser = new this.usersModel(persistenceModel);
    const userObject = await createdUser.save();
    return UserMapper.toDomain(userObject);
  }

  async findManyWithPagination({
    sortOptions,
    paginationOptions,
  }: {
    sortOptions?: SortUserDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<User[]> {
    const where: EntityCondition<User> = {};

    const userObjects = await this.usersModel
      .find(where)
      .sort(
        sortOptions?.reduce(
          (accumulator, sort) => ({
            ...accumulator,
            [sort.orderBy === 'id' ? '_id' : sort.orderBy]:
              sort.order.toUpperCase() === 'ASC' ? 1 : -1,
          }),
          {},
        ),
      )
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return userObjects.map((userObject) => UserMapper.toDomain(userObject));
  }

  async findOne(fields: EntityCondition<User>): Promise<NullableType<User>> {
    if (fields.id) {
      const userObject = await this.usersModel.findById(fields.id);
      return userObject ? UserMapper.toDomain(userObject) : null;
    }
    const userObject = await this.usersModel.findOne(fields);
    return userObject ? UserMapper.toDomain(userObject) : null;
  }

  async update(id: User['id'], payload: Partial<User>): Promise<User | null> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id };
    const userObject = await this.usersModel.findOneAndUpdate(
      filter,
      clonedPayload,
    );

    return userObject ? UserMapper.toDomain(userObject) : null;
  }

  async softDelete(id: User['id']): Promise<void> {
    await this.usersModel.deleteOne({
      _id: id,
    });
  }
}
