import { Test, TestingModule } from '@nestjs/testing';
import { SpeciesService } from './species.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Species } from './entities/species.entity';
import { Repository } from 'typeorm';
import { CreateSpeciesDto, UpdateSpeciesDto } from '@app/contracts';

/*
* author: github copilot
*/
describe('SpeciesService', () => {
  let service: SpeciesService;
  let repository: Repository<Species>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpeciesService,
        {
          provide: getRepositoryToken(Species),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<SpeciesService>(SpeciesService);
    repository = module.get<Repository<Species>>(getRepositoryToken(Species));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a species', async () => {
    const createSpeciesDto: CreateSpeciesDto = {
      id: 1,
      name: 'Rose',
      description: 'A beautiful flower',
      maintenance: 'Medium',
      watering: 'Regular',
      size: 'Medium',
      poisonous: false,
      sunlight: 'Full sun',
      edible_parts: 'None',
      default_image: 'rose.jpg',
    };

    jest.spyOn(repository, 'create').mockReturnValue(createSpeciesDto as any);
    jest.spyOn(repository, 'save').mockResolvedValue(createSpeciesDto as any);

    expect(await service.create(createSpeciesDto)).toEqual(createSpeciesDto);
  });

  it('should find all species', async () => {
    const speciesArray = [
      {
        id: 1,
        name: 'Rose',
        description: 'A beautiful flower',
        maintenance: 'Medium',
        watering: 'Regular',
        size: 'Medium',
        poisonous: false,
        sunlight: 'Full sun',
        edible_parts: 'None',
        default_image: 'rose.jpg',
      },
    ];

    jest.spyOn(repository, 'find').mockResolvedValue(speciesArray as any);

    expect(await service.findAll()).toEqual(speciesArray);
  });

  it('should find one species by id', async () => {
    const species = {
      id: 1,
      name: 'Rose',
      description: 'A beautiful flower',
      maintenance: 'Medium',
      watering: 'Regular',
      size: 'Medium',
      poisonous: false,
      sunlight: 'Full sun',
      edible_parts: 'None',
      default_image: 'rose.jpg',
    };

    jest.spyOn(repository, 'findOneBy').mockResolvedValue(species as any);

    expect(await service.findOne(1)).toEqual(species);
  });

  it('should update a species', async () => {
    const updateSpeciesDto: UpdateSpeciesDto = {
      id: 1,
      name: 'Rose',
      description: 'A beautiful flower',
      maintenance: 'Medium',
      watering: 'Regular',
      size: 'Medium',
      poisonous: false,
      sunlight: 'Full sun',
      edible_parts: 'None',
      default_image: 'rose.jpg',
    };

    jest.spyOn(repository, 'update').mockResolvedValue(undefined);
    jest.spyOn(service, 'findOne').mockResolvedValue(updateSpeciesDto as any);

    expect(await service.update(1, updateSpeciesDto)).toEqual(updateSpeciesDto);
  });

  it('should remove a species', async () => {
    jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

    expect(await service.remove(1)).toBeUndefined();
  });
});
