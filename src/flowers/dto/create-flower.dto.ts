import { IsString, IsOptional, IsBoolean, Length } from 'class-validator';

export class CreateFlowerDto {
  @IsString({ message: `Flower's name can't be empty` })
  @Length(1, 64, { message: 'Max length of 64 symbols is exceeded' })
  name: string;

  @IsBoolean({ message: `Value should be of type boolean` })
  @IsOptional()
  isStillAlive: boolean;
}
