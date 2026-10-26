import { Module } from '@nestjs/common';
import { SpeciesModule } from './species/species.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Species } from './species/entities/species.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: process.env.DB_TYPE || 'postgres' as any,
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT,10) || 5432,
    username: process.env.DB_USER || 'username',
    password: process.env.DB_PASS || 'password',
    database: process.env.DB_NAME || 'dbName',
    entities: [Species],       // Include the Species entity
    synchronize: false,         // Synchronize schema, useful for development (avoid in production)
    retryAttempts: 10,
    retryDelay: 10000,
  }),
  SpeciesModule],
  controllers: [],
  providers: [],
})
export class SpeciesAppModule {}
