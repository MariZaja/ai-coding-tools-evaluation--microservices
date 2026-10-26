import { Body, Controller, Get, HttpException, HttpStatus, Post, Query } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import axios from 'axios';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CreateCalendarDto } from './dto/create.calendar.dto';
import { CreateEventDto } from './dto/create.event.dto';

/**
 * author: chatGPT
 */
@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @ApiOperation({
    summary: 'Retrieve a single page of events from a Google Calendar',
    description:
      'This endpoint retrieves a single page of events from the specified Google Calendar. Supports pagination via the pageToken parameter.',
  })
  @ApiQuery({
    name: 'calendarId',
    required: false,
    type: String,
    description: 'The ID of the calendar to fetch events from. Defaults to "primary".',
    example: 'primary',
  })
  @ApiQuery({
    name: 'pageToken',
    required: false,
    type: String,
    description: 'Token for the next page of results. Used for pagination.',
    example: 'nextPageToken123',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved a page of events from the calendar.',
    schema: {
      example: {
        items: [
          {
            id: 'eventId123',
            summary: 'Team Meeting',
            description: 'Discussion about project updates',
            start: { dateTime: '2024-12-01T10:00:00Z', timeZone: 'UTC' },
            end: { dateTime: '2024-12-01T11:00:00Z', timeZone: 'UTC' },
          },
          {
            id: 'eventId456',
            summary: 'Doctor Appointment',
            description: 'Check-up with Dr. Smith',
            start: { dateTime: '2024-12-02T14:00:00Z', timeZone: 'UTC' },
            end: { dateTime: '2024-12-02T14:30:00Z', timeZone: 'UTC' },
          },
        ],
        nextPageToken: 'nextPageToken456',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: Invalid calendarId or pageToken.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: Missing or invalid access token.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found: Calendar with the provided ID does not exist.',
  })
  @Get('events')
  async getEvents(
    @Query('calendarId') calendarId: string,
    @Query('pageToken') pageToken?: string,
  ) {
    try {
      return await this.calendarService.getEvents(calendarId || 'primary', pageToken);
    } catch (error) {
      if (error.message.includes('not found')) {
        throw new HttpException(
          'The calendar ID provided does not exist.',
          HttpStatus.NOT_FOUND,
        );
      }
      if (error.message.includes('forbidden')) {
        throw new HttpException(
          'Access to the calendar is forbidden.',
          HttpStatus.FORBIDDEN,
        );
      }
      throw new HttpException(
        'An error occurred while retrieving calendar events.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @ApiOperation({ summary: 'Add an event to a Google Calendar' })
  @ApiResponse({
    status: 201,
    description: 'The event has been successfully added.',
    schema: {
      example: {
        kind: 'calendar#event',
        id: 'eventId123',
        summary: 'Team Meeting',
        description: 'Discussion about project updates',
        start: { dateTime: '2024-12-01T10:00:00Z', timeZone: 'UTC' },
        end: { dateTime: '2024-12-01T11:00:00Z', timeZone: 'UTC' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input or failed to add event.',
  })
  @Post('events')
  async addEvent(@Query('calendarId') calendarId: string, @Body() createEventDto: CreateEventDto) {
    return this.calendarService.addEvent(calendarId, createEventDto);
  }

  @ApiOperation({
    summary: 'Retrieve all events from a Google Calendar',
    description:
      'This endpoint retrieves all events from a specified Google Calendar. By default, it retrieves events from the primary calendar if no calendarId is provided.',
  })
  @ApiQuery({
    name: 'calendarId',
    required: false,
    type: String,
    description: 'The ID of the calendar to fetch events from. Defaults to "primary".',
    example: 'primary',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all events from the calendar.',
    schema: {
      example: [
        {
          id: 'eventId123',
          summary: 'Team Meeting',
          description: 'Discussion about project updates',
          start: { dateTime: '2024-12-01T10:00:00Z', timeZone: 'UTC' },
          end: { dateTime: '2024-12-01T11:00:00Z', timeZone: 'UTC' },
        },
        {
          id: 'eventId456',
          summary: 'Doctor Appointment',
          description: 'Check-up with Dr. Smith',
          start: { dateTime: '2024-12-02T14:00:00Z', timeZone: 'UTC' },
          end: { dateTime: '2024-12-02T14:30:00Z', timeZone: 'UTC' },
        },
      ],
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request: Invalid calendarId or other errors.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized: Missing or invalid access token.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found: Calendar with the provided ID does not exist.',
  })
  @Get('all-events')
  async getAllEvents(@Query('calendarId') calendarId: string) {
    try {
      return await this.calendarService.getAllEvents(calendarId || 'primary');
    } catch (error) {
      if (error.message.includes('not found')) {
        throw new HttpException(
          'The calendar ID provided does not exist.',
          HttpStatus.NOT_FOUND,
        );
      }
      if (error.message.includes('forbidden')) {
        throw new HttpException(
          'Access to the calendar is forbidden.',
          HttpStatus.FORBIDDEN,
        );
      }
      throw new HttpException(
        'An error occurred while retrieving events.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  
//   @Get('health')
//   async checkConnection() {
//     try {
//       // Zapytanie do Google API w celu weryfikacji tokena
//       const response = await axios.get('https://www.googleapis.com/oauth2/v1/tokeninfo', {
//         params: { access_token: process.env.GOOGLE_ACCESS_TOKEN },
//       });
//       return {
//         status: 'success',
//         message: 'Connection to Google API is valid.',
//         tokenInfo: response.data,
//       };
//     } catch (error) {
//       throw new HttpException(
//         `Failed to verify connection with Google API: ${error.response?.data?.error || error.message}`,
//         HttpStatus.BAD_REQUEST,
//       );
//     }
//   }

  @ApiOperation({ summary: 'Retrieve all calendars from Google Calendar' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved calendars',
    schema: {
      example: [
        {
          id: "primary",
          summary: "My Primary Calendar",
          description: "Primary calendar used for events and scheduling",
          timeZone: "UTC",
        },
        {
          id: "work@domain.com",
          summary: "Work Calendar",
          description: "Calendar used for work-related events",
          timeZone: "Europe/Warsaw",
        }
      ],
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Failed to fetch calendars due to insufficient permissions or other errors.',
  })
  @Get()
  async getAllCalendars() {
    return this.calendarService.getAllCalendars();
  }

  @ApiOperation({ summary: 'Create a new Google Calendar' })
  @ApiResponse({
    status: 201,
    description: 'The calendar has been successfully created.',
    schema: {
      example: {
        kind: 'calendar#calendar',
        id: 'new_calendar_id@group.calendar.google.com',
        summary: 'My New Calendar',
        description: 'This is a description for my new calendar',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input or failed to create calendar.',
  })
  @Post('create')
  async createCalendar(@Body() createCalendarDto: CreateCalendarDto) {
    return this.calendarService.createCalendar(createCalendarDto);
  }
}
