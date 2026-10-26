import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from '@app/contracts';

/**
 * author: chatGPT
 */
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    type: CreateUserDto,
    description: 'JSON payload to create a new user',
    examples: {
      example1: {
        summary: 'Basic User Creation',
        value: {
          username: 'john_doe',
          email: 'john.doe@example.com',
          password: 'securePassword123',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    schema: {
      example: {
        id: 1,
        username: 'john_doe',
        email: 'john.doe@example.com',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data.',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({
    status: 200,
    description: 'List of all users retrieved successfully.',
    schema: {
      example: [
        {
          id: 1,
          username: 'john_doe',
          email: 'john.doe@example.com',
        },
        {
          id: 2,
          username: 'jane_smith',
          email: 'jane.smith@example.com',
        },
      ],
    },
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific user by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully retrieved.',
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
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing user' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the user' })
  @ApiBody({
    type: UpdateUserDto,
    description: 'JSON payload to update the user',
    examples: {
      example1: {
        summary: 'Partial Update',
        value: {
          id: 1,
          email: 'updated.email@example.com',
        },
      },
      example2: {
        summary: 'Full Update',
        value: {
          id: 1,
          username: 'john_doe_updated',
          email: 'john.doe@example.com',
          password: 'newSecurePassword123',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
    schema: {
      example: {
        id: 1,
        username: 'john_doe_updated',
        email: 'john.doe@example.com',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific user by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
