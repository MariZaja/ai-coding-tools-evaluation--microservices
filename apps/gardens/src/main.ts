import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { GardensAppModule } from './gardens-app.module';
import { config } from 'dotenv';
// import { HttpExceptionFilter } from 'libs/filters/src';

async function bootstrap() {
  const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(
      GardensAppModule,
      {
        transport: Transport.TCP,
        options: {
          host: process.env.APP_BIND_HOST || 'localhost',
          port: parseInt(process.env.GARDENS_PORT, 10) || 3003,
        },
      },
    );

  // microservice.useGlobalFilters(new HttpExceptionFilter());

  await microservice.listen();
}
config();
bootstrap();
