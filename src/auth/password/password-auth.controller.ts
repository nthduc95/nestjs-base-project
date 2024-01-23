import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { LoginUserWithPassword } from './dtos/login-with-password.dto';
import { PasswordAuthService } from './password-auth.service';
import { LoginUserWithPasswordResponseDto } from './dtos/login-with-password.response.dto';

@ApiTags('auth')
@Controller('auth')
export class PasswordAuthController {
  constructor(private passwordAuthService: PasswordAuthService) {}

  @Post('login-with-password')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Return user access tokens.',
    type: LoginUserWithPasswordResponseDto,
  })
  async loginWithPassword(
    @Body() request: LoginUserWithPassword,
  ): Promise<LoginUserWithPasswordResponseDto> {
    return await this.passwordAuthService.login(
      request.email,
      request.password,
    );
  }
}
