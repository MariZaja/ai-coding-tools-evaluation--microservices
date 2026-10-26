import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({
    description: 'Title of the event',
    example: 'Team Meeting',
  })
  summary: string;

  @ApiProperty({
    description: 'Description of the event',
    example: 'Discussion about project updates',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Start date and time in ISO format',
    example: '2024-12-01T10:00:00Z',
  })
  start: string;

  @ApiProperty({
    description: 'End date and time in ISO format',
    example: '2024-12-01T11:00:00Z',
  })
  end: string;

  @ApiProperty({
    description: 'Timezone of the event',
    example: 'UTC',
  })
  timeZone: string;
}
