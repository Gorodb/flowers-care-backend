import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { IJwtPayload } from '../types/jwt-payload.interface';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('token'),
      secretOrKey: jwtConstants.secret,
      ignoreExpiration: false,
    });
  }

  validate(payload: IJwtPayload) {
    return { userId: payload.sub, username: payload.login };
  }
}
