import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: process.env.DB_TYPE as any || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT,10) || 5432,
    username: process.env.DB_USER || 'username',
    password: process.env.DB_PASS || 'password',
    database: process.env.DB_NAME || 'dbName',
    entities: [User],
    synchronize: false,
    retryAttempts: 10,
    retryDelay: 10000,
  }),
  UsersModule],
  controllers: [],
  providers: [],
})
export class UsersAppModule {}
