import { Exclude, Expose } from 'class-transformer';

export class User {
  @Expose()
  id: string;

  @Expose()
  email: string | null;

  @Expose()
  username: string;

  @Exclude({ toPlainOnly: true })
  password: string;

  @Exclude({ toPlainOnly: true })
  rtHash?: string;

  @Expose()
  avatarUrl: string;

  @Exclude({ toPlainOnly: true })
  createdAt: Date;

  @Exclude({ toPlainOnly: true })
  updatedAt: Date;
}
