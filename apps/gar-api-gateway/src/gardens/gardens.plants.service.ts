import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  CreatePlantDto,
  PLANT_PATTERNS,
  UpdatePlantDto,
  PlantDto,
} from '@app/contracts';
import { CalendarService } from '../calendar/calendar/calendar.service';
import { CreateEventDto } from '../calendar/calendar/dto/create.event.dto';

function getRandomStringFromList(list: string[]): string {
  const randomIndex = Math.floor(Math.random() * list.length);
  return list[randomIndex];
}

// adjust calendar_id to work with user's calendar
const CALENDAR_ID = 'primary';

@Injectable()
export class GardensPlantsService {
  constructor(
    @Inject('GARDENS_CLIENT') private readonly gardenServiceClient: ClientProxy,
    private readonly calendarService: CalendarService,
  ) {}

  
  async createPlant(gardenId: number, createPlantDto: CreatePlantDto) {
    const plant = await firstValueFrom(
      this.gardenServiceClient.send<PlantDto, CreatePlantDto>(PLANT_PATTERNS.CREATE, { gardenId, ...createPlantDto })
    );

    console.log('Creating plant');

    if (!plant) {
      throw new Error('Plant creation failed');
    }

    // // const species = await this.fetchSpeciesInfo(plant.speciesId);

    // // if (!species || !species.watering) {
    // //   throw new Error('Species does not have watering information');
    // // }

    // // const wateringTime = this.calculateWateringTime(species.watering);

    const myList = ['high', 'low', 'average'];
    const watering = getRandomStringFromList(myList);

    const { startTime, endTime } = this.calculateWateringTime(watering);

    const createEventDto: CreateEventDto = {
      summary: `Watering for ${plant.name}`,
      description: `Scheduled watering for ${plant.name}`,
      start: startTime,
      end: endTime,
      timeZone: 'UTC',
    };

    console.log('Creating watering event:', createEventDto);

    // Schedule the watering event for the plant
    await this.calendarService.addEvent(CALENDAR_ID, createEventDto);

    return plant;
  }

  // private async fetchSpeciesInfo(speciesId: string): Promise<SpeciesDto> {
  //   return firstValueFrom(
  //     this.gardenServiceClient.send<SpeciesDto>(PLANT_PATTERNS.FETCH_SPECIES_INFO, speciesId)
  //   );
  // }

  private calculateWateringTime(watering: string): { startTime: string, endTime: string } {
    const now = new Date();
  
    let startTime: Date;
    let endTime: Date;
  
    switch (watering) {
      case 'high':
        startTime = new Date(now.setHours(8, 0, 0, 0));
        endTime = new Date(startTime.getTime() + 60 * 60 * 1000);
        break;
  
      case 'low':
        now.setDate(now.getDate() + 2);
        startTime = new Date(now.setHours(10, 0, 0, 0));
        endTime = new Date(startTime.getTime() + 60 * 60 * 1000);
        break;
  
      case 'average':
        now.setDate(now.getDate() + (7 - now.getDay()));
        startTime = new Date(now.setHours(8, 0, 0, 0));
        endTime = new Date(startTime.getTime() + 60 * 60 * 1000);
        break;
  
      default:
        throw new Error('Unsupported watering type');
    }
  
    return {
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
    };
  }  

  findAll(gardenId: number) {
    return this.gardenServiceClient
      .send<PlantDto[]>(PLANT_PATTERNS.FIND_ALL_BY_GARDEN, { gardenId });
  }

  getPlant(gardenId: number, plantId: number) {
    return this.gardenServiceClient
      .send<PlantDto>(PLANT_PATTERNS.FIND_ONE, { gardenId, plantId });
  }

  updatePlant(id: number, updatePlantDto: UpdatePlantDto) {
    console.log(`UPDATE: ${id} with ${JSON.stringify({ updatePlantDto }, null, 2)}`)
    return this.gardenServiceClient
      .send<PlantDto, UpdatePlantDto>(PLANT_PATTERNS.UPDATE, { id, ...updatePlantDto });
  }

  deletePlant(gardenId: number, plantId: number) {
    return this.gardenServiceClient
      .send<PlantDto>(PLANT_PATTERNS.REMOVE, { gardenId, plantId });
  }
}
