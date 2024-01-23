import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RequestContext } from 'src/shared/request-context/request-context.dto';
import { User } from 'src/shared/entities/user.entity';
import { ReqContext } from 'src/shared/request-context/req-context.decorator';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { RoleGuard } from 'src/auth/role/roles.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/info')
  @ApiOperation({ summary: 'Get user info' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  // @Roles(USER_ROLE.ADMIN)
  @ApiResponse({ status: HttpStatus.OK, schema: {} })
  @UseInterceptors(ClassSerializerInterceptor)
  async getUsser(@ReqContext() ctx: RequestContext): Promise<User> {
    return await this.userService.findOneById(ctx.user.id);
  }
}
