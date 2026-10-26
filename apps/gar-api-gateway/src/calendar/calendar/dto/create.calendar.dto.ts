  import { ApiProperty } from '@nestjs/swagger';

  export class CreateCalendarDto {
    @ApiProperty({
      description: 'Summary of the calendar',
      example: 'My New Calendar',
    })
    summary: string;

    @ApiProperty({
      description: 'Description of the calendar',
      example: 'This is a description for my new calendar',
      required: false,
    })
    description?: string;
  }