import { Module } from '@nestjs/common';
import { GardensModule } from './gardens/gardens.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gardens } from './gardens/entities/garden.entity';
import { Plant } from './gardens/entities/plant.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
      type: process.env.DB_TYPE || ('postgres' as any),
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USER || 'username',
      password: process.env.DB_PASS || 'password',
      database: process.env.DB_NAME || 'dbName',
      entities: [Gardens, Plant],
      synchronize: false,
      retryAttempts: 10,
      retryDelay: 10000,
    }),
    GardensModule],
  controllers: [],
  providers: [],
})
export class GardensAppModule {}
