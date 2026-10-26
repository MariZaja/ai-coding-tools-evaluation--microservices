import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Species } from './entities/species.entity';
import { CreateSpeciesDto, UpdateSpeciesDto } from '@app/contracts';

@Injectable()
export class SpeciesService {
  constructor(
    @InjectRepository(Species)
    private speciesRepository: Repository<Species>,
  ) {}

  async create(createSpeciesDto: CreateSpeciesDto): Promise<Species> {
    const newSpecies = this.speciesRepository.create(createSpeciesDto);
    return await this.speciesRepository.save(newSpecies);
  }

  async findAll(): Promise<Species[]> {
    const speciesList = await this.speciesRepository.find();
    return speciesList.map((species) => ({
      ...species,
      default_image: species.default_image
        ? `data:image/jpeg;base64,${species.default_image}`
        : null,
    }));
  }

  async findOne(id: number): Promise<Species> {
    const species = await this.speciesRepository.findOneBy({ id });
    return {
      ...species,
      default_image: species.default_image
        ? `data:image/jpeg;base64,${species.default_image}`
        : null,
    };
  }

  async update(
    id: number,
    updateSpeciesDto: UpdateSpeciesDto,
  ): Promise<Species> {
    await this.speciesRepository.update(id, updateSpeciesDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.speciesRepository.delete(id);
  }
}
