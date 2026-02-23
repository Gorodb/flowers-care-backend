import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFlowerDto } from './dto/create-flower.dto';
import { UpdateFlowerDto } from './dto/update-flower.dto';
import { Flower } from './entities/flower.entity';

@Injectable()
export class FlowersService {
  constructor(
    @InjectRepository(Flower)
    private flowersRepository: Repository<Flower>,
  ) {}

  create(createFlowerDto: Partial<CreateFlowerDto>): Promise<Flower> {
    const flower = this.flowersRepository.create(createFlowerDto);
    return this.flowersRepository.save(flower);
  }

  findAll(): Promise<Flower[]> {
    return this.flowersRepository.find();
  }

  findOne(id: number): Promise<Flower | null> {
    return this.flowersRepository.findOneBy({ id });
  }

  update(id: number, updateFlowerDto: Partial<UpdateFlowerDto>) {
    return this.flowersRepository.update(id, updateFlowerDto);
  }

  remove(id: number) {
    return this.flowersRepository.delete(id);
  }
}
