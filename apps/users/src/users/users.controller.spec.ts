import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from '@app/contracts';

/*
* author: github copilot
*/
describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
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

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = { username: 'john_doe', email: 'john.doe@example.com', password: 'securePassword123' };
      const result = { id: 1, ...createUserDto };
      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createUserDto)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = [
        { id: 1, username: 'john_doe', email: 'john.doe@example.com', password: 'password123' },
        { id: 2, username: 'jane_smith', email: 'jane.smith@example.com', password: 'password123' },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const result = { id: 1, username: 'john_doe', email: 'john.doe@example.com', password: 'password123' };
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne(1)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto: UpdateUserDto = { id: 1, email: 'updated.email@example.com' };
      const result = { id: 1, username: 'john_doe', email: 'updated.email@example.com', password: 'securePassword123' };
      jest.spyOn(service, 'update').mockResolvedValue(result);

      expect(await controller.update(updateUserDto)).toBe(result);
    });
  });

  /*
  * author: chatGPT
  */
  describe('remove', () => {
    it('should remove a user', async () => {
      const userId = 1;
  
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);
  
      const result = await controller.remove(userId);
  
      expect(service.remove).toHaveBeenCalledWith(userId);
      expect(result).toBeUndefined();
    });
  });
});