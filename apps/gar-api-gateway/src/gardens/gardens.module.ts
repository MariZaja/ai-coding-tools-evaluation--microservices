import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { GardensService } from './gardens.service';
import { GardensController } from './gardens.controller';
import { GardensPlantsService } from './gardens.plants.service';
import { GardensPlantsController } from './gardens.plants.controller';
import { CalendarModule } from '../calendar/calendar/calendar.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'GARDENS_CLIENT',
        transport: Transport.TCP,
        options: {
          host: process.env.GARDENS_HOST || 'localhost',
          port: parseInt(process.env.GARDENS_PORT, 10) || 3003,
        },
      },
    ]),
    CalendarModule,
  ],
  controllers: [GardensController, GardensPlantsController],
  providers: [GardensService, GardensPlantsService],
})
export class GardensModule {}
