import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateGardenDto,
  GARDEN_PATTERNS,
  UpdateGardenDto,
  GardenDto,
} from '@app/contracts';

@Injectable()
export class GardensService {
  constructor(@Inject('GARDENS_CLIENT') private gardensClient: ClientProxy) {}

  create(createGardensDto: CreateGardenDto) {
    return this.gardensClient
      .send<
        GardenDto,
        CreateGardenDto
      >(GARDEN_PATTERNS.CREATE, createGardensDto);
  }

  findAll() {
    return this.gardensClient
      .send<GardenDto[]>(GARDEN_PATTERNS.FIND_ALL, {});
  }

  findByUser(userId: number) {
    return this.gardensClient
      .send<GardenDto[]>(GARDEN_PATTERNS.FIND_BY_USER, userId);
  }

  findOne(id: number) {
    return this.gardensClient
      .send<GardenDto>(GARDEN_PATTERNS.FIND_ONE, id);
  }

  update(id: number, updateGardensDto: UpdateGardenDto) {
    return this.gardensClient
      .send<GardenDto, UpdateGardenDto>(GARDEN_PATTERNS.UPDATE, {
        id,
        ...updateGardensDto,
      });
  }

  remove(id: number) {
    return this.gardensClient
      .send<GardenDto>(GARDEN_PATTERNS.REMOVE, id);
  }
  
}
