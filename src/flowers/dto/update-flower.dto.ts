import { PartialType } from '@nestjs/mapped-types';
import { CreateFlowerDto } from './create-flower.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateFlowerDto extends PartialType(CreateFlowerDto) {
  @IsBoolean({ message: `Value should be of type boolean` })
  @IsOptional()
  isStillAlive: boolean;
}
