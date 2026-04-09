import { Module } from '@nestjs/common';
import { FlowersService } from './flowers.service';
import { FlowersController } from './flowers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flower } from './entities/flower.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path } from 'app-root-path';

@Module({
  imports: [
    TypeOrmModule.forFeature([Flower]),
    ServeStaticModule.forRoot({
      rootPath: `${path}/uploads`,
      serveRoot: '/static',
    }),
  ],
  controllers: [FlowersController],
  providers: [FlowersService],
})
export class FlowersModule {}
