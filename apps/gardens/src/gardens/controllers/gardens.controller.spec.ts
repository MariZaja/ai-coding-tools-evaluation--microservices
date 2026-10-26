import { Test, TestingModule } from '@nestjs/testing';
import { GardensController } from './gardens.controller';
import { GardensService } from '../services/gardens.service';
import { CreateGardenDto, UpdateGardenDto } from '@app/contracts';

/*
* author: chatGPT
*/
describe('GardensController', () => {
  let controller: GardensController;
  let service: GardensService;

  const mockGardensService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findByUser: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GardensController],
      providers: [
        {
          provide: GardensService,
          useValue: mockGardensService,
        },
      ],
    }).compile();

    controller = module.get<GardensController>(GardensController);
    service = module.get<GardensService>(GardensService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call GardensService.create', async () => {
      const createGardenDto: CreateGardenDto = {
        user_id: 1,
        name: 'Garden 1',
        creation_date: new Date(),
        surroundings: 'Near the park',
      };

      await controller.create(createGardenDto);
      expect(service.create).toHaveBeenCalledWith(createGardenDto);
    });
  });

  describe('findAll', () => {
    it('should call GardensService.findAll', async () => {
      await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findByUser', () => {
    it('should call GardensService.findByUser with userId', async () => {
      const userId = 1;
      await controller.findByUser(userId);
      expect(service.findByUser).toHaveBeenCalledWith(userId);
    });
  });

  describe('findOne', () => {
    it('should call GardensService.findOne with id', async () => {
      const id = 1;
      await controller.findOne(id);
      expect(service.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should call GardensService.update with id and dto', async () => {
      const updateGardenDto: UpdateGardenDto = { id: 1, user_id: 1, name: 'Updated Garden', creation_date: new Date(), surroundings: 'Updated location' };
      await controller.update(updateGardenDto);
      expect(service.update).toHaveBeenCalledWith(updateGardenDto.id, updateGardenDto);
    });
  });

  describe('remove', () => {
    it('should call GardensService.remove with id', async () => {
      const id = 1;
      await controller.remove(id);
      expect(service.remove).toHaveBeenCalledWith(id);
    });
  });
});
