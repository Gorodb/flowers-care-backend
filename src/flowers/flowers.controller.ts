import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Logger,
} from '@nestjs/common';
import { FlowersService } from './flowers.service';
import { CreateFlowerDto } from './dto/create-flower.dto';
import { UpdateFlowerDto } from './dto/update-flower.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { AuthRequest } from '../auth/types/auth-request.interface';

@Controller('flowers')
export class FlowersController {
  constructor(private readonly flowersService: FlowersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createFlowerDto: Partial<CreateFlowerDto>,
    @Request() req: AuthRequest,
  ) {
    Logger.log(req.user);
    return this.flowersService.create(createFlowerDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req: AuthRequest) {
    return this.flowersService.findAll(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: AuthRequest) {
    return this.flowersService.findOne(+id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFlowerDto: Partial<UpdateFlowerDto>,
    @Request() req: AuthRequest,
  ) {
    return this.flowersService.update(+id, updateFlowerDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: AuthRequest) {
    return this.flowersService.remove(+id, req.user.id);
  }
}
