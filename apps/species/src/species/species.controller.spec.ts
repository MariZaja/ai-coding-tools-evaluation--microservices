import { Test, TestingModule } from '@nestjs/testing';
import { SpeciesController } from './species.controller';
import { SpeciesService } from './species.service';
import { CreateSpeciesDto, SpeciesDto } from '@app/contracts';

/**
 * author: github copilot
 */
describe('SpeciesController', () => {
  let controller: SpeciesController;
  let service: SpeciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpeciesController],
      providers: [
        {
          provide: SpeciesService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SpeciesController>(SpeciesController);
    service = module.get<SpeciesService>(SpeciesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a species', async () => {
      const createSpeciesDto: CreateSpeciesDto = {
        id: 1,
        name: 'Ficus',
        description: 'Indoor plant, easy to maintain.',
        maintenance: 'Low',
        watering: 'Twice a week',
        size: 'Medium',
        poisonous: true,
        sunlight: 'Indirect sunlight',
        edible_parts: 'None',
        default_image: 'image_url',
      };
      const createdSpecies: SpeciesDto = { ...createSpeciesDto };
      jest.spyOn(service, 'create').mockResolvedValue(createdSpecies);

      const result = await controller.create(createSpeciesDto);
      expect(result).toEqual(createdSpecies);
      expect(service.create).toHaveBeenCalledWith(createSpeciesDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of species', async () => {
      const speciesArray: SpeciesDto[] = [
        {
          id: 1,
          name: 'Ficus',
          description: 'Indoor plant, easy to maintain.',
          maintenance: 'Low',
          watering: 'Twice a week',
          size: 'Medium',
          poisonous: true,
          sunlight: 'Indirect sunlight',
          edible_parts: 'None',
          default_image: 'image_url',
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(speciesArray);

      const result = await controller.findAll();
      expect(result).toEqual(speciesArray);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single species', async () => {
      const species: SpeciesDto = {
        id: 1,
        name: 'Ficus',
        description: 'Indoor plant, easy to maintain.',
        maintenance: 'Low',
        watering: 'Twice a week',
        size: 'Medium',
        poisonous: true,
        sunlight: 'Indirect sunlight',
        edible_parts: 'None',
        default_image: 'image_url',
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(species);

      const result = await controller.findOne(Number('1'));
      expect(result).toEqual(species);
      expect(service.findOne).toHaveBeenCalledWith(1); // Ensure the controller converts string to number
    });
  });

  describe('update', () => {
    it('should update a species', async () => {
      const updateSpeciesDto: SpeciesDto = {
        id: 1,
        name: 'Ficus Updated',
        description: 'Updated description.',
        maintenance: 'Low',
        watering: 'Twice a week',
        size: 'Medium',
        poisonous: true,
        sunlight: 'Indirect sunlight',
        edible_parts: 'None',
        default_image: 'image_url',
      } as SpeciesDto;
      const updatedSpecies: SpeciesDto = { ...updateSpeciesDto };
      jest.spyOn(service, 'update').mockResolvedValue(updatedSpecies);

      const result = await controller.update(updateSpeciesDto);
      expect(result).toEqual(updatedSpecies);
      expect(service.update).toHaveBeenCalledWith(1, updateSpeciesDto); // Ensure the controller converts string to number
    });
  });

  describe('remove', () => {
    it('should remove a species', async () => {
      const speciesId = 1;
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      const result = await controller.remove(speciesId);
      
      expect(service.remove).toHaveBeenCalledWith(speciesId);
      expect(result).toBeUndefined();
    });
  });
});
