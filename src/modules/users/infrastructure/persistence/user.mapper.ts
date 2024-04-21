import { User } from 'src/modules/users/domain/user';
import { UserSchemaClass } from 'src/modules/users/infrastructure/persistence/user.schema';

export class UserMapper {
  static toDomain(raw: UserSchemaClass): User {
    const user = new User();
    user.id = raw._id.toString();
    user.email = raw.email;
    user.username = raw.username;
    user.password = raw.password;
    user.rtHash = raw.rtHash;
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
    userEntity.rtHash = user.rtHash;
    userEntity.avatarUrl = user.avatarUrl;
    userEntity.createdAt = user.createdAt;
    userEntity.updatedAt = user.updatedAt;
    return userEntity;
  }
}
