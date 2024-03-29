import { UserModule } from '../../components/user/user.module';
import { PasswordAuthController } from './password-auth.controller';
import { Module } from '@nestjs/common';
import { PasswordAuthService } from './password-auth.service';
import { JwtAuthModule } from '../jwt/jwt-auth.module';

@Module({
  imports: [UserModule, JwtAuthModule],
  controllers: [PasswordAuthController],
  providers: [PasswordAuthService],
})
export class PasswordAuthModule {}
