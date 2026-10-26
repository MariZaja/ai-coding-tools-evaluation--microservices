import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateSpeciesDto,
  SPECIES_PATTERNS,
  UpdateSpeciesDto,
  SpeciesDto,
} from '@app/contracts';

@Injectable()
export class SpeciesService {
  constructor(@Inject('SPECIES_CLIENT') private speciesClient: ClientProxy) {}

  create(createSpeciesDto: CreateSpeciesDto) {
    return this.speciesClient.send<SpeciesDto, CreateSpeciesDto>(
      SPECIES_PATTERNS.CREATE,
      createSpeciesDto
    );
  }

  findAll() {
    return this.speciesClient
      .send<SpeciesDto[]>(SPECIES_PATTERNS.FIND_ALL, {});
  }

  findOne(id: number) {
    return this.speciesClient.send<SpeciesDto>(
      SPECIES_PATTERNS.FIND_ONE,
      id
    );
  }

  update(id: number, updateSpeciesDto: UpdateSpeciesDto) {
    return this.speciesClient.send<SpeciesDto, UpdateSpeciesDto>(
      SPECIES_PATTERNS.UPDATE, {
      id,
      ...updateSpeciesDto,
    });
  }

  remove(id: number) {
    return this.speciesClient.send<SpeciesDto>(
      SPECIES_PATTERNS.REMOVE,
      id
    );
  }
}
