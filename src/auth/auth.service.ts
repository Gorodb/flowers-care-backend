import {
  Injectable,
  UnauthorizedException,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { IJwtPayload } from './types/jwt-payload.interface';
import { UserDto } from '../users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(login: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user: User = await this.usersService.create({
      login,
      password: hashedPassword,
    });

    return this.generateToken(user);
  }

  async validateUser(
    login: string,
    pass: string,
  ): Promise<{
    user: User | null;
    reason?: string;
  }> {
    const user = await this.usersService.findOne(login);
    if (!user) return { user: null, reason: 'Not registered' };

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) return { user: null, reason: 'Authentication error' };

    return { user };
  }

  async login({ login, password, isRegistration }: UserDto): Promise<{
    access_token?: string;
    success: boolean;
    reason?: string;
  }> {
    const { user, reason } = await this.validateUser(login, password);
    if (!user && isRegistration) {
      return await this.register(login, password);
    } else if (!user && !isRegistration) {
      throw new UnauthorizedException(reason);
    }
    const payload: IJwtPayload = { login, sub: user!.id };
    return {
      access_token: this.jwtService.sign(payload),
      success: true,
    };
  }

  generateToken(user: User) {
    const payload = { sub: user.id, login: user.login };

    return {
      access_token: this.jwtService.sign(payload),
      success: true,
    };
  }
}
