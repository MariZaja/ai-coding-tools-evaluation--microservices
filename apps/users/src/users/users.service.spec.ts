import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const repositoryMock = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOneBy: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: repositoryMock },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto = { username: 'JohnDoe', email: 'john@example.com', password: 'password' };
    const user = { id: 1, username: 'JohnDoe', email: 'john@example.com' } as User;

    jest.spyOn(repository, 'create').mockReturnValue(user);
    jest.spyOn(repository, 'save').mockResolvedValue(user);

    const result = await service.create(createUserDto);
    expect(result).toEqual(user);
    expect(repository.create).toHaveBeenCalledWith(createUserDto);
    expect(repository.save).toHaveBeenCalledWith(user);
  });

  it('should find all users', async () => {
    const users = [{ id: 1, username: 'JohnDoe', email: 'john@example.com' }] as User[];

    jest.spyOn(repository, 'find').mockResolvedValue(users);

    const result = await service.findAll();
    expect(result).toEqual(users);
    expect(repository.find).toHaveBeenCalled();
  });

  it('should find one user', async () => {
    const user = { id: 1, username: 'JohnDoe', email: 'john@example.com' } as User;

    jest.spyOn(repository, 'findOneBy').mockResolvedValue(user);

    const result = await service.findOne(1);
    expect(result).toEqual(user);
    expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it('should update a user', async () => {
    const updateUserDto = { id: 1, username: 'JaneDoe', email: 'jane@example.com' };
    const user = { id: 1, username: 'JaneDoe', email: 'jane@example.com' } as User;

    jest.spyOn(repository, 'update').mockResolvedValue(undefined);
    jest.spyOn(repository, 'findOneBy').mockResolvedValue(user);

    const result = await service.update(1, updateUserDto);
    expect(result).toEqual(user);
    expect(repository.update).toHaveBeenCalledWith(1, updateUserDto);
    expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it('should remove a user', async () => {
    jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

    const result = await service.remove(1);
    expect(result).toBeUndefined();
    expect(repository.delete).toHaveBeenCalledWith(1);
  });
});
