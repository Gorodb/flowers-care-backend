import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlowersModule } from './flowers/flowers.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db', // if using docker-compose
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'flowers-care',
      autoLoadEntities: true,
      synchronize: true, // ⚠ only for dev!
    }),
    FlowersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
