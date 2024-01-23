import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthService } from './jwt/jwt-auth.service';
import { RefreshTokenResponseDto } from './dtos/refresh-token.response.dto';
import { RefreshTokenDto } from './dtos/create-refresh-token.dto';
import { MESSAGES } from 'src/shared/constants';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private jwtAuthService: JwtAuthService) {}
  @Post('/refresh-token')
  @ApiOperation({ summary: 'Refresh token' })
  @ApiOkResponse({
    description: 'Return user access tokens.',
    type: RefreshTokenResponseDto,
  })
  @ApiBadRequestResponse({
    description: MESSAGES.ERROR.BAD_REQUEST,
  })
  @ApiResponse({ status: HttpStatus.OK })
  async refreshToken(@Body() request: RefreshTokenDto) {
    try {
      const newToken = await this.jwtAuthService.refreshToken(
        request.refreshToken.toString(),
      );
      return newToken;
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
