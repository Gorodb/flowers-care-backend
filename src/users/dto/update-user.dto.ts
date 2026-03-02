import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString, Length, IsNumber } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString({ message: `User's login can't be empty` })
  login: string;

  @IsString({ message: `User's password can't be empty` })
  @Length(4, 16, { message: 'Password must be at least 6 symbols' })
  password: string;

  @IsNumber()
  id: number;
}
