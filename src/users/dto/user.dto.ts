import { IsString, Length, IsBoolean, IsOptional } from 'class-validator';

export class UserDto {
  @IsString({ message: `User's login can't be empty` })
  login: string;

  @IsString({ message: `User's password can't be empty` })
  @Length(4, 16, { message: 'Password must be at least 6 symbols' })
  password: string;

  @IsOptional()
  @IsBoolean({ message: `Value should be of type boolean` })
  isRegistration: string;
}
