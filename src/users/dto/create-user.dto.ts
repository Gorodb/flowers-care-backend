import { IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: `User's login can't be empty` })
  login: string;

  @IsString({ message: `User's password can't be empty` })
  @Length(4, 16, { message: 'Password must be at least 6 symbols' })
  password: string;
}
