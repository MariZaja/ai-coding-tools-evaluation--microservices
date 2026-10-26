  import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
  import { GardensService } from './gardens.service';
  import { CreateGardenDto, UpdateGardenDto } from '@app/contracts'
  import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';

  @ApiTags('Gardens')
  @Controller('gardens')
  export class GardensController {
    constructor(private readonly gardensService: GardensService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new garden' })
    @ApiBody({
      description: 'Payload for creating a new garden',
      schema: {
        example: {
          user_id: 1,
          name: 'Rose Garden',
          creation_date: '2023-12-01',
          surroundings: 'Near a river',
        },
      },
    })
    @ApiResponse({
      status: 201,
      description: 'Garden successfully created.',
      schema: {
        example: {
          id: 1,
          user_id: 1,
          name: 'Rose Garden',
          creation_date: '2023-12-01T00:00:00.000Z',
          surroundings: 'Near a river',
        },
      },
    })
    @ApiResponse({ status: 400, description: 'Bad request.' })
    create(@Body() createGardenDto: CreateGardenDto) {
      return this.gardensService.create(createGardenDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all gardens' })
    @ApiResponse({
      status: 200,
      description: 'List of gardens.',
      schema: {
        example: [
          {
            id: 1,
            user_id: 1,
            name: 'Rose Garden',
            creation_date: '2023-12-01T00:00:00.000Z',
            surroundings: 'Near a river',
          },
          {
            id: 2,
            user_id: 2,
            name: 'Vegetable Patch',
            creation_date: '2023-11-20T00:00:00.000Z',
            surroundings: 'Backyard',
          },
        ],
      },
    })
    findAll() {
      return this.gardensService.findAll();
    }

    @Get(':userId')
    @ApiOperation({ summary: 'Get gardens by user ID' })
    @ApiParam({ name: 'userId', description: 'ID of the user', type: String })
    @ApiResponse({
      status: 200,
      description: 'Gardens for the user.',
      schema: {
        example: [
          {
            id: 1,
            user_id: 1,
            name: 'Rose Garden',
            creation_date: '2023-12-01T00:00:00.000Z',
            surroundings: 'Near a river',
          },
        ],
      },
    })
    @ApiResponse({ status: 404, description: 'User not found.' })
    findByUser(@Param('userId') userId: string) {
      return this.gardensService.findByUser(+userId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a single garden by ID' })
    @ApiParam({ name: 'id', description: 'ID of the garden', type: String })
    @ApiResponse({
      status: 200,
      description: 'Garden details.',
      schema: {
        example: {
          id: 1,
          user_id: 1,
          name: 'Rose Garden',
          creation_date: '2023-12-01T00:00:00.000Z',
          surroundings: 'Near a river',
        },
      },
    })
    @ApiResponse({ status: 404, description: 'Garden not found.' })
    findOne(@Param('id') id: string) {
      return this.gardensService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a garden' })
    @ApiParam({ name: 'id', description: 'ID of the garden', type: String })
    @ApiBody({
      description: 'Payload for updating a garden',
      schema: {
        example: {
          id: 1,
          user_id: 1,
          name: 'Updated Rose Garden',
          creation_date: '2023-12-01',
          surroundings: 'Updated surroundings',
        },
      },
    })
    @ApiResponse({
      status: 200,
      description: 'Garden successfully updated.',
      schema: {
        example: {
          id: 1,
          user_id: 1,
          name: 'Updated Rose Garden',
          creation_date: '2023-12-01T00:00:00.000Z',
          surroundings: 'Updated surroundings',
        },
      },
    })
    @ApiResponse({ status: 404, description: 'Garden not found.' })
    update(@Param('id') id: string, @Body() updateGardenDto: UpdateGardenDto) {
      return this.gardensService.update(+id, updateGardenDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a garden' })
    @ApiParam({ name: 'id', description: 'ID of the garden', type: String })
    @ApiResponse({
      status: 200,
      description: 'Garden successfully deleted.',
      schema: {
        example: {
          message: 'Garden with ID 1 has been deleted.',
        },
      },
    })
    @ApiResponse({ status: 404, description: 'Garden not found.' })
    remove(@Param('id') id: string) {
      return this.gardensService.remove(+id);
    }
  }