import { Controller, Get, Post, Patch, Delete, Body, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CreatePlantDto, UpdatePlantDto } from '@app/contracts';
import { GardensPlantsService } from './gardens.plants.service';

/**
 * author: chatGPT
 */
@ApiTags('Gardens Plants')
@Controller('gardens/:gardenId/plants')
export class GardensPlantsController {
  constructor(private readonly gardensPlantsService: GardensPlantsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new plant in the specified garden' })
  @ApiParam({ name: 'gardenId', type: Number, description: 'ID of the garden' })
  @ApiQuery({
    name: 'name',
    description: 'Name of the plant',
    example: 'Basil',
  })
  @ApiQuery({
    name: 'notes',
    description: 'Optional notes about the plant',
    example: 'Requires partial sunlight',
    required: false,
  })
  @ApiQuery({
    name: 'speciesId',
    description: 'Optional species ID of the plant',
    example: 3,
    required: false,
  })
  @ApiResponse({
    status: 201,
    description: 'The plant has been successfully created.',
    schema: {
      example: {
        id: 1,
        name: 'Basil',
        notes: 'Thrives in sunny locations',
        gardenId: 1,
        speciesId: 3,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data. Check the parameters for correctness.',
  })
  create(
    @Param('gardenId', ParseIntPipe) gardenId: number,
    @Body() query: CreatePlantDto,
  ) {
    return this.gardensPlantsService.createPlant(gardenId, query);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all plants in the specified garden' })
  @ApiParam({ name: 'gardenId', type: Number, description: 'ID of the garden' })
  @ApiResponse({
    status: 200,
    description: 'List of plants retrieved successfully.',
    schema: {
      example: [
        {
          id: 1,
          name: 'Basil',
          notes: 'Thrives in sunny locations',
          gardenId: 1,
          speciesId: 3,
        },
        {
          id: 2,
          name: 'Rosemary',
          notes: 'Requires good sunlight',
          gardenId: 1,
        },
      ],
    },
  })
  findAll(@Param('gardenId', ParseIntPipe) gardenId: number) {
    return this.gardensPlantsService.findAll(gardenId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific plant by ID in the specified garden' })
  @ApiParam({ name: 'gardenId', type: Number, description: 'ID of the garden' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the plant' })
  @ApiResponse({
    status: 200,
    description: 'Plant retrieved successfully.',
    schema: {
      example: {
        id: 1,
        name: 'Basil',
        notes: 'Thrives in sunny locations',
        gardenId: 1,
        speciesId: 3,
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Plant not found. Ensure the garden ID and plant ID are correct.',
  })
  findOne(@Param('gardenId', ParseIntPipe) gardenId: number, @Param('id', ParseIntPipe) plantId: number) {
    return this.gardensPlantsService.getPlant(gardenId, plantId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a specific plant by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the plant' })
  @ApiQuery({
    name: 'name',
    description: 'New name of the plant (optional)',
    required: false,
    example: 'Mint',
  })
  @ApiQuery({
    name: 'notes',
    description: 'Updated notes about the plant (optional)',
    required: false,
    example: 'Low water requirements',
  })
  @ApiQuery({
    name: 'speciesId',
    description: 'Updated species ID of the plant (optional)',
    required: false,
    example: 4,
  })
  @ApiResponse({
    status: 200,
    description: 'The plant has been successfully updated.',
    schema: {
      example: {
        id: 1,
        name: 'Mint',
        notes: 'Low water requirements',
        gardenId: 1,
        speciesId: 4,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data. Ensure correct parameters are provided.',
  })
  @ApiResponse({
    status: 404,
    description: 'Plant not found. Verify the ID and garden association.',
  })
  update(
    @Param('id', ParseIntPipe) plantId: number,
    @Query() query: UpdatePlantDto,
  ) {
    return this.gardensPlantsService.updatePlant(plantId, query);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific plant by ID in the specified garden' })
  @ApiParam({ name: 'gardenId', type: Number, description: 'ID of the garden' })
  @ApiParam({ name: 'id', type: Number, description: 'ID of the plant' })
  @ApiResponse({
    status: 200,
    description: 'The plant has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Plant not found. Verify the garden and plant IDs.',
  })
  remove(
    @Param('gardenId', ParseIntPipe) gardenId: number,
    @Param('id', ParseIntPipe) plantId: number,
  ) {
    return this.gardensPlantsService.deletePlant(gardenId, plantId);
  }
}
