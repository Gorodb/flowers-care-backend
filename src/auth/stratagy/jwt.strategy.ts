import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { IJwtPayload } from '../types/jwt-payload.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('token'),
      secretOrKey: configService.get('JWT_SECRET')!,
      ignoreExpiration: false,
    });
  }

  validate(payload: IJwtPayload): { id: number; login: string } {
    return { id: payload.sub, login: payload.login };
  }
}
