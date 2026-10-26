import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gardens } from '../entities/garden.entity';
import { CreateGardenDto, UpdateGardenDto } from '@app/contracts';

@Injectable()
export class GardensService {
  constructor(
    @InjectRepository(Gardens)
    private gardensRepository: Repository<Gardens>,
  ) {}

  async create(createGardensDto: CreateGardenDto): Promise<Gardens> {
    const newGardens = this.gardensRepository.create({
      ...createGardensDto,
      image: createGardensDto.image || null,
    });
    return await this.gardensRepository.save(newGardens);
  }

  async findByUser(userId: number): Promise<Gardens[]> {
    const gardens = await this.gardensRepository.find({ where: { user_id: userId } });
    return gardens.map((garden) => ({
      ...garden,
      image: garden.image
        ? `data:image/jpeg;base64,${garden.image}`
        : null,
    }));
  }

  async findAll(): Promise<Gardens[]> {
    const gardens = await this.gardensRepository.find();
    return gardens.map((garden) => ({
      ...garden,
      image: garden.image
        ? `data:image/jpeg;base64,${garden.image}`
        : null,
    }));
  }

  async findOne(id: number): Promise<Gardens> {
    const garden = await this.gardensRepository.findOneBy({ id });
    return {
      ...garden,
      image: garden.image
        ? `data:image/jpeg;base64,${garden.image}`
        : null,
    };
  }

  async update(
    id: number,
    updateGardensDto: UpdateGardenDto,
  ): Promise<Gardens> {
    await this.gardensRepository.update(id, updateGardensDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.gardensRepository.delete(id);
  }
}