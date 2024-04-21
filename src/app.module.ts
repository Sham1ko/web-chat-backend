import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';
import { ContactsModule } from './modules/contacts/contacts.module';
import { DatabaseModule } from './processors/database.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    // ContactsModule,
    AuthModule,
    UserModule,
    // ChatModule,
  ],
})
export class AppModule {}
