import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.DATABASE_URL, // URL базы данных MongoDB
        dbName: process.env.DB_NAME, // Имя базы данных MongoDB
        user: process.env.DB_USERNAME, // Имя пользователя MongoDB
        pass: process.env.DB_PASSWORD, // Пароль пользователя MongoDB
      }),
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
