import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateUserDto,
  UpdateUserDto,
  UserDto,
  USERS_PATTERNS,
} from '@app/contracts';

@Injectable()
export class UsersService {
  constructor(@Inject('USERS_CLIENT') private usersClient: ClientProxy) {}

  create(createUserDto: CreateUserDto) {
    return this.usersClient.send<UserDto, CreateUserDto>(
      USERS_PATTERNS.CREATE,
      createUserDto,
    );
  }

  findAll() {
    return this.usersClient
      .send<UserDto[]>(USERS_PATTERNS.FIND_ALL, {})
  }

  findOne(id: number) {
    return this.usersClient.send<UserDto>(USERS_PATTERNS.FIND_ONE, id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersClient.send<UserDto, UpdateUserDto>(
      USERS_PATTERNS.UPDATE,
      { id, ...updateUserDto },
    );
  }

  remove(id: number) {
    return this.usersClient.send<UserDto>(USERS_PATTERNS.REMOVE, id);
  }
}
