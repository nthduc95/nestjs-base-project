import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from '../../components/user/services/user.service';
import { ConfigService } from '@nestjs/config';

type JwtPayloadDecoded = {
  sub: number;
  email: string;
  name: string;
  iat: number;
  exp: number;
};

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: extractJwtFromCookie,
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.secret'),
    });
  }

  async validate(payload: JwtPayloadDecoded) {
    const user = await this.userService.findOneById(payload.sub);
    this.userService.checkRole(user);
    return { id: payload.sub, email: payload.email, name: payload.name };
  }
}

const extractJwtFromCookie = (req) => {
  // Get JWT from cookie or Bearer token
  let token = null;

  if (req && req.cookies) {
    token = req.cookies['accessToken'];
  }

  return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req);
};
