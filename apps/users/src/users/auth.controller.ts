import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { USERS_PATTERNS } from '@app/contracts';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(USERS_PATTERNS.LOGIN)
  login(
    @Payload() { username, password }: { username: string; password: string },
  ) {
    return this.authService.validateUser(username, password);
  }

  @MessagePattern(USERS_PATTERNS.AUTH)
  findUser(@Payload() { username }: { username: string }) {
    return this.authService.findUser(username);
  }

  // /**
  //  * author: chatGPT
  //  */
  // @MessagePattern(USERS_PATTERNS.GOOGLE_AUTH_URL)
  // async getGoogleAuthUrl() {
  //   return this.authService.getGoogleAuthUrl();
  // }

  // /**
  //  * author: chatGPT
  //  */
  // @MessagePattern(USERS_PATTERNS.GOOGLE_CALLBACK)
  // async handleGoogleCallback(@Payload() code: string) {
  //   return this.authService.exchangeCodeForTokens(code);
  // }
}