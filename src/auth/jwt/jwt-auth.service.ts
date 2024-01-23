import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../shared/entities/user.entity';
import * as appConfig from '../../shared/configs/configuration';
import { UserService } from '../../components/user/services/user.service';

type JwtPayload = { sub: number; email: string; name: string };

export type Tokens = { accessToken: string; refreshToken: string };

@Injectable()
export class JwtAuthService {
  private appParams;
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {
    this.appParams = appConfig.default();
  }

  login(user: User): Tokens {
    // Generate jwt tokens
    const tokenPayLoad: JwtPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    return {
      accessToken: this.jwtService.sign(tokenPayLoad),
      refreshToken: this.jwtService.sign(tokenPayLoad, {
        expiresIn: this.appParams.jwt.refreshTokenExpiresIn,
      }),
    };
  }

  async refreshToken(refreshToken: string): Promise<Tokens> {
    // Decode refresh token from request.
    const refreshTokenDecoded = await this.jwtService.verifyAsync(
      refreshToken,
      this.appParams.jwt.secret,
    );

    // Generate token from refresh token
    const user = await this.userService.findOneByEmail(
      refreshTokenDecoded.email,
    );

    if (!user) {
      throw new UnauthorizedException('User not found in DB.');
    }
    const newToken = this.login(user);
    return newToken;
  }
}
