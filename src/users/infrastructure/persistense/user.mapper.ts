import { User } from 'src/users/domain/user';
import { UserSchemaClass } from 'src/users/infrastructure/persistense/user.schema';

export class UserMapper {
  static toDomain(raw: UserSchemaClass): User {
    const user = new User();
    user.id = raw._id.toString();
    user.email = raw.email;
    user.username = raw.username;
    user.password = raw.password;
    user.avatarUrl = raw.avatarUrl;
    user.createdAt = raw.createdAt;
    user.updatedAt = raw.updatedAt;
    return user;
  }

  static toPersistence(user: User): UserSchemaClass {
    const userEntity = new UserSchemaClass();
    if (user.id && typeof user.id === 'string') {
      userEntity._id = user.id;
    }
    userEntity.email = user.email;
    userEntity.password = user.password;
    userEntity.username = user.username;
    userEntity.avatarUrl = user.avatarUrl;
    userEntity.createdAt = user.createdAt;
    userEntity.updatedAt = user.updatedAt;
    return userEntity;
  }
}
