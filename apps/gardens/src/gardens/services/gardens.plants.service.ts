import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plant } from '../entities/plant.entity';
import {
  CreatePlantDto,
  UpdatePlantDto
} from '@app/contracts'
import { Gardens } from '../entities/garden.entity';

/*
* author: chatGPT
*/
@Injectable()
export class GardenPlantService {
  constructor(
    @InjectRepository(Plant)
    private readonly plantRepository: Repository<Plant>,
    @InjectRepository(Gardens)
    private readonly gardensRepository: Repository<Gardens>,
  ) {}

  async create(createPlantDto: CreatePlantDto): Promise<Plant> {
    const newPlant = this.plantRepository.create({
      ...createPlantDto,
      speciesId: createPlantDto.speciesId,
      image: createPlantDto.image || null,
    });
    return this.plantRepository.save(newPlant);
  }

  async findAllByGarden(gardenId: number): Promise<Plant[]> {
    const plants = await this.plantRepository.find({ where: { gardenId } });
    return plants.map((plant) => ({
      ...plant,
      image: plant.image
        ? `data:image/jpeg;base64,${plant.image}`
        : null,
    }));
  }

  async findOneByGarden(gardenId: number, plantId: number): Promise<Plant> {
    const plant = await this.plantRepository.findOne({
      where: { gardenId, id: plantId },
    });
    return {
      ...plant,
      image: plant.image
        ? `data:image/jpeg;base64,${plant.image}`
        : null,
    };
  }

  async gardenExists(gardenId: number): Promise<boolean> {
    const garden = await this.gardensRepository.findOne({
      where: { id: gardenId },
    });
    return !!garden;
  }

  async update(plantDto: UpdatePlantDto): Promise<Plant> {
    const updateData = {
      ...plantDto,
      speciesId: plantDto.speciesId,
    };
    await this.plantRepository.update(plantDto.id, updateData);
    return await this.plantRepository.findOne({ where: { id: plantDto.id } });
  }

  async remove(gardenId: number, plantId: number): Promise<Plant> {
    const plant = await this.findOneByGarden(gardenId, plantId);
    return await this.plantRepository.remove(plant);
  }
}
