import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { SpeciesAppModule } from './species-app.module';
import { config } from 'dotenv';

async function bootstrap() {
 const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(
    SpeciesAppModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.APP_BIND_HOST || 'localhost',
        port: parseInt(process.env.SPECIES_PORT,10) || 3002,
      },
    },
  );
  await microservice.listen();

}
config();
bootstrap();
