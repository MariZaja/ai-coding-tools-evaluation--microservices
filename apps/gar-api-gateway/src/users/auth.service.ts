import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { USERS_PATTERNS, UserDto } from '@app/contracts';

@Injectable()
export class AuthService {
  constructor(@Inject('USERS_CLIENT') private usersClient: ClientProxy) {}

  validateUser({ username, password }: { username: string; password: string }) {
    return this.usersClient.send<UserDto>(USERS_PATTERNS.LOGIN, {
      username,
      password,
    });
  }

  findUser({ username }: { username: string }) {
    return this.usersClient.send<{ id:String }>(USERS_PATTERNS.AUTH, {
      username,
    });
  }
}
