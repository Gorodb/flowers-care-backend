import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { IJwtPayload } from './types/jwt-payload.interface';

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

  async validateUser(login: string, pass: string) {
    const user = await this.usersService.findOne(login);
    if (!user) return null;

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) return null;

    return user;
  }

  login(user: User): { access_token: string } {
    const payload: IJwtPayload = { login: user.login, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  generateToken(user: User) {
    const payload = { sub: user.id, login: user.login };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
