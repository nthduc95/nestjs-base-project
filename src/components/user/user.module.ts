import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/shared/entities/user.entity';
import { IsUniqueConstraint } from './validators/validate-unique';
import { MatchPasswordConstraint } from './validators/validate-match-password';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, IsUniqueConstraint, MatchPasswordConstraint],
  exports: [UserService],
})
export class UserModule {}
