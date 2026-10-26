import { Module } from '@nestjs/common';
import { GardensService } from './services/gardens.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gardens } from './entities/garden.entity';
import { GardenPlantService } from './services/gardens.plants.service';
import { GardensController } from './controllers/gardens.controller';
import { GardensPlantsController } from './controllers/gardens.plants.controller';
import { Plant } from './entities/plant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gardens]), TypeOrmModule.forFeature([Plant])],
  controllers: [GardensController, GardensPlantsController],
  providers: [GardensService, GardenPlantService],
})
export class GardensModule {}
