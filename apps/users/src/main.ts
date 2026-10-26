import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { UsersAppModule } from './users-app.module';
import { config } from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersAppModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.APP_BIND_HOST || 'localhost',
        port: parseInt(process.env.USERS_PORT, 10) || 3001,
      },
    },
  );
  await app.listen();
}
config();
bootstrap();
