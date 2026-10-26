import { Controller } from '@nestjs/common';
import { GardenPlantService } from '../services/gardens.plants.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreatePlantDto, UpdatePlantDto, PLANT_PATTERNS } from '@app/contracts';

@Controller()
export class GardensPlantsController {
  constructor(private readonly gardenPlantService: GardenPlantService) {}

  @MessagePattern(PLANT_PATTERNS.CREATE)
  create(@Payload() createGardenPlantDto: CreatePlantDto) {

    var newPlant = this.gardenPlantService.create( createGardenPlantDto);
    return newPlant
  }

  @MessagePattern(PLANT_PATTERNS.FIND_ALL_BY_GARDEN)
  findAll(@Payload() payload: { gardenId: number }) {
    return this.gardenPlantService.findAllByGarden(payload.gardenId);
  }

  @MessagePattern(PLANT_PATTERNS.FIND_ONE)
  findOne(@Payload() payload: { gardenId: number, plantId: number }) {
    const { gardenId, plantId } = payload
    return this.gardenPlantService.findOneByGarden(gardenId, plantId);
  }

  @MessagePattern(PLANT_PATTERNS.UPDATE)
  update(@Payload() plantDto: UpdatePlantDto) {
    console.log(`Plants controller: ${JSON.stringify({ plantDto }, null, 2)}`);
    return this.gardenPlantService.update(plantDto);
  }

  @MessagePattern(PLANT_PATTERNS.REMOVE)
  remove(@Payload() payload: {gardenId: number; plantId: number}) {
    const { gardenId, plantId } = payload;
    return this.gardenPlantService.remove(gardenId, plantId);
  }
}
