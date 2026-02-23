import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlowersModule } from './flowers/flowers.module';
import { UsersModule } from './users/users.module';

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
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
