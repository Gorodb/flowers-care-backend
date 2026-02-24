import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  applyDecorators,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class UserTokenGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }

    // Example: Bearer token check
    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid authorization format');
    }

    // TODO: validate token here
    const isValid = token === 'my-secret-token';

    if (!isValid) {
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }
}

export const Roles = () =>
  applyDecorators(
    UseGuards(AuthGuard()),
    UseGuards(UserTokenGuard),
    SetMetadata('roles', roles),
  );
