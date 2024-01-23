import { Module } from '@nestjs/common';
import { UserModule } from './components/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { PasswordAuthModule } from './auth/password/password-auth.module';
@Module({
  imports: [
    SharedModule,
    UserModule,
    AuthModule,
    PasswordAuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
