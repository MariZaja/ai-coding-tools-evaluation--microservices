import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';
import { SpeciesService } from './species.service';
import { CreateSpeciesDto, UpdateSpeciesDto } from '@app/contracts';

/**
 * author: chatGPT
 */
@ApiTags('Species')
@Controller('species')
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new species' })
  @ApiBody({
    type: CreateSpeciesDto,
    description: 'JSON payload to create a new species',
    examples: {
      example1: {
        summary: 'Basic Species Creation',
        value: {
          name: 'Ficus',
          description: 'Indoor plant, easy to maintain.',
          maintenance: 'Low',
          watering: 'Twice a week',
          size: 'Medium',
          poisonous: true,
          sunlight: 'Indirect sunlight',
          edible_parts: 'None',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The species has been successfully created.',
    schema: {
      example: {
        id: 1,
        name: 'Ficus',
        description: 'Indoor plant, easy to maintain.',
        maintenance: 'Low',
        watering: 'Twice a week',
        size: 'Medium',
        poisonous: true,
        sunlight: 'Indirect sunlight',
        edible_parts: 'None',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data.',
  })
  create(@Body() createSpeciesDto: CreateSpeciesDto) {
    return this.speciesService.create(createSpeciesDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all species' })
  @ApiResponse({
    status: 200,
    description: 'List of all species retrieved successfully.',
    schema: {
      example: [
        {
          id: 1,
          name: 'Ficus',
          description: 'Indoor plant, easy to maintain.',
          maintenance: 'Low',
          watering: 'Twice a week',
          size: 'Medium',
          poisonous: true,
          sunlight: 'Indirect sunlight',
          edible_parts: 'None',
        },
        {
          id: 2,
          name: 'Aloe Vera',
          description: 'Medicinal plant.',
          maintenance: 'Minimal',
          watering: 'Once a week',
          size: 'Small',
          poisonous: false,
          sunlight: 'Full sunlight',
          edible_parts: 'Leaves',
        },
      ],
    },
  })
  findAll() {
    return this.speciesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific species by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the species' })
  @ApiResponse({
    status: 200,
    description: 'The species has been successfully retrieved.',
    schema: {
      example: {
        id: 1,
        name: 'Ficus',
        description: 'Indoor plant, easy to maintain.',
        maintenance: 'Low',
        watering: 'Twice a week',
        size: 'Medium',
        poisonous: true,
        sunlight: 'Indirect sunlight',
        edible_parts: 'None',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Species not found.',
  })
  findOne(@Param('id') id: string) {
    return this.speciesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing species' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the species' })
  @ApiBody({
    type: UpdateSpeciesDto,
    description: 'JSON payload to update the species',
    examples: {
      example1: {
        summary: 'Partial Update',
        value: {
          id: 1,
          name: 'Ficus',
          description: 'Updated description.',
        },
      },
      example2: {
        summary: 'Full Update',
        value: {
          id: 1,
          name: 'Ficus Updated',
          description: 'Indoor plant, easy to maintain.',
          maintenance: 'Low',
          watering: 'Twice a week',
          size: 'Medium',
          poisonous: true,
          sunlight: 'Indirect sunlight',
          edible_parts: 'None',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The species has been successfully updated.',
    schema: {
      example: {
        id: 1,
        name: 'Ficus Updated',
        description: 'Indoor plant, easy to maintain.',
        maintenance: 'Low',
        watering: 'Twice a week',
        size: 'Medium',
        poisonous: true,
        sunlight: 'Indirect sunlight',
        edible_parts: 'None',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input data.',
  })
  @ApiResponse({
    status: 404,
    description: 'Species not found.',
  })
  update(@Param('id') id: string, @Body() updateSpeciesDto: UpdateSpeciesDto) {
    return this.speciesService.update(+id, updateSpeciesDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a specific species by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the species' })
  @ApiResponse({
    status: 200,
    description: 'The species has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Species not found.',
  })
  remove(@Param('id') id: string) {
    return this.speciesService.remove(+id);
  }
}
