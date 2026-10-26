import { Test, TestingModule } from '@nestjs/testing';
import { GardensPlantsController } from './gardens.plants.controller';
import { GardenPlantService } from '../services/gardens.plants.service';
import { CreatePlantDto, UpdatePlantDto, PLANT_PATTERNS } from '@app/contracts';

describe('GardensPlantsController', () => {
  let controller: GardensPlantsController;
  let service: GardenPlantService;

  const mockGardenPlantService = {
    create: jest.fn(),
    findAllByGarden: jest.fn(),
    findOneByGarden: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GardensPlantsController],
      providers: [
        {
          provide: GardenPlantService,
          useValue: mockGardenPlantService,
        },
      ],
    }).compile();

    controller = module.get<GardensPlantsController>(GardensPlantsController);
    service = module.get<GardenPlantService>(GardenPlantService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call GardenPlantService.create and return the new plant', async () => {
      const createPlantDto: CreatePlantDto = { name: 'Rose', gardenId: 1 };
      const newPlant = { id: 1, ...createPlantDto };

      mockGardenPlantService.create.mockResolvedValue(newPlant);

      const result = await controller.create(createPlantDto);

      expect(mockGardenPlantService.create).toHaveBeenCalledWith(createPlantDto);
      expect(result).toEqual(newPlant);
    });
  });

  describe('findAll', () => {
    it('should call GardenPlantService.findAllByGarden and return plants for the given gardenId', async () => {
      const gardenId = 1;
      const plants = [
        { id: 1, name: 'Rose', gardenId },
        { id: 2, name: 'Tulip', gardenId },
      ];

      mockGardenPlantService.findAllByGarden.mockResolvedValue(plants);

      const result = await controller.findAll({ gardenId });

      expect(mockGardenPlantService.findAllByGarden).toHaveBeenCalledWith(gardenId);
      expect(result).toEqual(plants);
    });
  });

  describe('findOne', () => {
    it('should call GardenPlantService.findOneByGarden and return the plant for the given gardenId and plantId', async () => {
      const gardenId = 1;
      const plantId = 1;
      const plant = { id: plantId, name: 'Rose', gardenId };

      mockGardenPlantService.findOneByGarden.mockResolvedValue(plant);

      const result = await controller.findOne({ gardenId, plantId });

      expect(mockGardenPlantService.findOneByGarden).toHaveBeenCalledWith(gardenId, plantId);
      expect(result).toEqual(plant);
    });
  });

  describe('update', () => {
    it('should call GardenPlantService.update and return the updated plant', async () => {
      const updatePlantDto: UpdatePlantDto = { id: 1, name: 'Updated Rose' };
      const updatedPlant = { id: 1, ...updatePlantDto };

      mockGardenPlantService.update.mockResolvedValue(updatedPlant);

      const result = await controller.update(updatePlantDto);

      expect(mockGardenPlantService.update).toHaveBeenCalledWith(updatePlantDto);
      expect(result).toEqual(updatedPlant);
    });
  });

  describe('remove', () => {
    it('should call GardenPlantService.remove and remove the plant', async () => {
      const gardenId = 1;
      const plantId = 1;

      mockGardenPlantService.remove.mockResolvedValue(undefined);

      await controller.remove({ gardenId, plantId });

      expect(mockGardenPlantService.remove).toHaveBeenCalledWith(gardenId, plantId);
    });
  });
});
