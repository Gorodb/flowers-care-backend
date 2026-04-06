import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFlowerDto } from './dto/create-flower.dto';
import { UpdateFlowerDto } from './dto/update-flower.dto';
import { Flower } from './entities/flower.entity';
import {
  AllFlowersResponse,
  DeleteResponse,
  FlowersResponse,
} from './types/response';

const logger = new Logger('FlowersService');

@Injectable()
export class FlowersService {
  constructor(
    @InjectRepository(Flower)
    private flowersRepository: Repository<Flower>,
  ) {}

  async create(
    createFlowerDto: Partial<CreateFlowerDto>,
    userId: number,
  ): Promise<FlowersResponse> {
    logger.debug('creating a flower');
    logger.debug('userId', userId);
    logger.debug('createFlowerDto', createFlowerDto);
    const flower = this.flowersRepository.create({
      ...createFlowerDto,
      userId,
    });
    const data = await this.flowersRepository.save(flower);
    if (!data) {
      return { success: false };
    }
    return { success: true, data };
  }

  async findAll(userId: number): Promise<AllFlowersResponse> {
    logger.debug('find all flowers for user: ', userId);
    const data = await this.flowersRepository.find({ where: { userId } });
    return { success: true, data };
  }

  async findOne(id: number, userId: number): Promise<FlowersResponse> {
    logger.debug('find a flower: ', id, ' for user: ', userId);
    const flower = await this.flowersRepository.findOneBy({ id });
    if (!flower || !userId || flower.userId !== userId) {
      return { success: false };
    }
    return { success: true, data: flower };
  }

  async update(
    id: number,
    updateFlowerDto: Partial<UpdateFlowerDto>,
    userId: number,
  ): Promise<FlowersResponse> {
    logger.debug('update a flower with id: ', id, ' for user: ', userId);
    let flower = await this.flowersRepository.findOneBy({ id, userId });
    if (!flower) {
      return { success: false };
    }
    await this.flowersRepository.update(id, updateFlowerDto);
    flower = await this.flowersRepository.findOneBy({ id, userId });
    return { success: true, data: flower! };
  }

  async remove(id: number, userId: number): Promise<DeleteResponse> {
    logger.debug('remove a flower with id: ', id, ' for user: ', userId);
    const deletedFlower = await this.flowersRepository.delete({ id, userId });
    if (deletedFlower.affected === 0) {
      return { success: false };
    }
    return { success: true };
  }
}
