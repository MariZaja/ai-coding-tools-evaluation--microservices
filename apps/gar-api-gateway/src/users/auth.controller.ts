import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';

/**
 * author: chatGPT
 */
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login a user with username and password' })
  @ApiBody({
    description: 'JSON payload for login credentials',
    examples: {
      example1: {
        summary: 'Valid Login',
        value: {
          username: 'john_doe',
          password: 'securePassword123',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in.',
    schema: {
      example: {
        accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        user: {
          id: 1,
          username: 'john_doe',
          email: 'john.doe@example.com',
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid username or password.',
  })
  login(@Body() { username, password }: { username: string; password: string }) {
    return this.authService.validateUser({ username, password });
  }

  @Post('user')
  @ApiOperation({ summary: 'Find a user by username' })
  @ApiBody({
    description: 'JSON payload to search for a user',
    examples: {
      example1: {
        summary: 'Find User by Username',
        value: {
          username: 'john_doe',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'User found successfully.',
    schema: {
      example: {
        id: 1,
        username: 'john_doe',
        email: 'john.doe@example.com',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  findUser(@Body() { username }: { username: string }) {
    return this.authService.findUser({ username });
  }
}
