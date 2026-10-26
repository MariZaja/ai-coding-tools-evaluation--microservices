import { Test, TestingModule } from '@nestjs/testing';
import { GardensService } from './gardens.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gardens } from '../entities/garden.entity';
import { CreateGardenDto, UpdateGardenDto } from '@app/contracts';

/*
* author: chatGPT
*/
describe('GardensService', () => {
  let service: GardensService;
  let repository: Repository<Gardens>;

  const mockGardensRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GardensService,
        {
          provide: getRepositoryToken(Gardens),
          useValue: mockGardensRepository,
        },
      ],
    }).compile();

    service = module.get<GardensService>(GardensService);
    repository = module.get<Repository<Gardens>>(getRepositoryToken(Gardens));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a new garden', async () => {
      const createGardenDto: CreateGardenDto = {
        user_id: 1,
        name: 'Garden 1',
        creation_date: new Date(),
        surroundings: 'Near the park',
      };

      const garden = { id: 1, ...createGardenDto };

      mockGardensRepository.create.mockReturnValue(garden);
      mockGardensRepository.save.mockResolvedValue(garden);

      const result = await service.create(createGardenDto);

      expect(mockGardensRepository.create).toHaveBeenCalledWith(createGardenDto);
      expect(mockGardensRepository.save).toHaveBeenCalledWith(garden);
      expect(result).toEqual(garden);
    });
  });

  describe('findByUser', () => {
    it('should return a list of gardens for a user', async () => {
      const userId = 1;
      const gardens = [{ id: 1, user_id: userId, name: 'Garden 1' }];

      mockGardensRepository.find.mockResolvedValue(gardens);

      const result = await service.findByUser(userId);

      expect(mockGardensRepository.find).toHaveBeenCalledWith({ where: { user_id: userId } });
      expect(result).toEqual(gardens);
    });
  });

  describe('findAll', () => {
    it('should return all gardens', async () => {
      const gardens = [{ id: 1, name: 'Garden 1' }];

      mockGardensRepository.find.mockResolvedValue(gardens);

      const result = await service.findAll();

      expect(mockGardensRepository.find).toHaveBeenCalled();
      expect(result).toEqual(gardens);
    });
  });

  describe('findOne', () => {
    it('should return a single garden by id', async () => {
      const id = 1;
      const garden = { id, name: 'Garden 1' };

      mockGardensRepository.findOneBy.mockResolvedValue(garden);

      const result = await service.findOne(id);

      expect(mockGardensRepository.findOneBy).toHaveBeenCalledWith({ id });
      expect(result).toEqual(garden);
    });
  });

  describe('update', () => {
    it('should update and return the garden', async () => {
      const id = 1;
      const updateGardenDto: UpdateGardenDto = { id, user_id: 1, name: 'Updated Garden', creation_date: new Date(), surroundings: 'Updated location' };

      const updatedGarden = { id, ...updateGardenDto };

      mockGardensRepository.update.mockResolvedValue(undefined); // update doesn't return anything
      mockGardensRepository.findOneBy.mockResolvedValue(updatedGarden);

      const result = await service.update(id, updateGardenDto);

      expect(mockGardensRepository.update).toHaveBeenCalledWith(id, updateGardenDto);
      expect(mockGardensRepository.findOneBy).toHaveBeenCalledWith({ id });
      expect(result).toEqual(updatedGarden);
    });
  });

  describe('remove', () => {
    it('should remove the garden', async () => {
      const id = 1;

      mockGardensRepository.delete.mockResolvedValue(undefined);

      await service.remove(id);

      expect(mockGardensRepository.delete).toHaveBeenCalledWith(id);
    });
  });
});
