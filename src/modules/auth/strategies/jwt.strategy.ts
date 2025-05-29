import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import jwt from '@config/jwt';
import { UserService } from '@user/user.service';
import { IJwtPayload } from '@auth/dto/inputs/jwt-payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwt.secret,
    });
  }

  async validate(payload: IJwtPayload): Promise<Express.User> {
    return {
      id: payload.id,
      name: payload.name,
      email: payload.email,
    };
  }
}
