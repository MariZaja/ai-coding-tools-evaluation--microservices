import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CreateGardenDto,
  GARDEN_PATTERNS,
  UpdateGardenDto,
} from '@app/contracts';
import { GardensService } from '../services/gardens.service';


@Controller()
export class GardensController {
  constructor(
    private readonly gardensService: GardensService
  ) {}

  @MessagePattern(GARDEN_PATTERNS.CREATE)
  create(@Payload() createGardenDto: CreateGardenDto) {
    return this.gardensService.create(createGardenDto);
  }

  @MessagePattern(GARDEN_PATTERNS.FIND_ALL)
  findAll() {
    return this.gardensService.findAll();
  }

  @MessagePattern(GARDEN_PATTERNS.FIND_BY_USER)
  findByUser(@Payload() userId: number) {
    return this.gardensService.findByUser(userId);
  }

  @MessagePattern(GARDEN_PATTERNS.FIND_ONE)
  findOne(@Payload() id: number) {
    return this.gardensService.findOne(id);
  }

  @MessagePattern(GARDEN_PATTERNS.UPDATE)
  update(@Payload() updateGardenDto: UpdateGardenDto) {
    return this.gardensService.update(updateGardenDto.id, updateGardenDto);
  }

  @MessagePattern(GARDEN_PATTERNS.REMOVE)
  remove(@Payload() id: number) {
    return this.gardensService.remove(id);
  }
}
