import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { SpeciesService } from './species.service';
import { SpeciesController } from './species.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SPECIES_CLIENT',
        transport: Transport.TCP,
        options: {
          host: process.env.SPECIES_HOST || 'localhost',
          port: parseInt(process.env.SPECIES_PORT,10) || 3002,
        },
      },
    ]),
  ],
  controllers: [SpeciesController],
  providers: [SpeciesService],
})
export class SpeciesModule {}
