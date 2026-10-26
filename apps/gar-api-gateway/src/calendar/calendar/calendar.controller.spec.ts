import { Test, TestingModule } from '@nestjs/testing';
import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateCalendarDto } from './dto/create.calendar.dto';
import { CreateEventDto } from './dto/create.event.dto';

/*
* author: chatGPT
*/
describe('CalendarController', () => {
  let calendarController: CalendarController;
  let calendarService: CalendarService;

  const mockCalendarService = {
    getEvents: jest.fn(),
    addEvent: jest.fn(),
    getAllEvents: jest.fn(),
    getAllCalendars: jest.fn(),
    createCalendar: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalendarController],
      providers: [
        {
          provide: CalendarService,
          useValue: mockCalendarService,
        },
      ],
    }).compile();

    calendarController = module.get<CalendarController>(CalendarController);
    calendarService = module.get<CalendarService>(CalendarService);
  });

  it('should be defined', () => {
    expect(calendarController).toBeDefined();
  });

  describe('getEvents', () => {
    it('should return a list of events', async () => {
      const result = { items: [], nextPageToken: 'nextPageToken123' };
      mockCalendarService.getEvents.mockResolvedValue(result);

      const response = await calendarController.getEvents('primary', undefined);
      expect(response).toEqual(result);
    });

    it('should throw a 404 error when calendar not found', async () => {
      mockCalendarService.getEvents.mockRejectedValue(new Error('Calendar not found'));

      try {
        await calendarController.getEvents('primary', undefined);
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException);
        expect(e.getStatus()).toBe(HttpStatus.NOT_FOUND);
      }
    });

    it('should throw a 400 error on other errors', async () => {
      mockCalendarService.getEvents.mockRejectedValue(new Error('Bad request'));

      try {
        await calendarController.getEvents('primary', undefined);
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException);
        expect(e.getStatus()).toBe(HttpStatus.BAD_REQUEST);
      }
    });
  });

  describe('addEvent', () => {
    it('should successfully add an event', async () => {
      const createEventDto: CreateEventDto = {
        summary: 'Team Meeting',
        start: '2024-12-01T10:00:00Z',
        end: '2024-12-01T11:00:00Z',
        timeZone: 'UTC',
      };
      const result = {
        kind: 'calendar#event',
        id: 'eventId123',
        summary: 'Team Meeting',
        start: { dateTime: '2024-12-01T10:00:00Z', timeZone: 'UTC' },
        end: { dateTime: '2024-12-01T11:00:00Z', timeZone: 'UTC' },
      };
      mockCalendarService.addEvent.mockResolvedValue(result);

      const response = await calendarController.addEvent('primary', createEventDto);
      expect(response).toEqual(result);
    });

    it('should throw an error if event creation fails', async () => {
      const createEventDto: CreateEventDto = {
        summary: 'Team Meeting',
        start: '2024-12-01T10:00:00Z',
        end: '2024-12-01T11:00:00Z',
        timeZone: 'UTC',
      };
    
      mockCalendarService.addEvent.mockRejectedValueOnce(
        new HttpException('Event creation failed', HttpStatus.BAD_REQUEST),
      );
    
      await expect(calendarController.addEvent('primary', createEventDto))
        .rejects
        .toThrowError(new HttpException('Event creation failed', HttpStatus.BAD_REQUEST));
    });
    
  });

  describe('getAllEvents', () => {
    it('should return all events from the calendar', async () => {
      const result = [
        {
          id: 'eventId123',
          summary: 'Team Meeting',
          start: { dateTime: '2024-12-01T10:00:00Z', timeZone: 'UTC' },
          end: { dateTime: '2024-12-01T11:00:00Z', timeZone: 'UTC' },
        },
        {
          id: 'eventId456',
          summary: 'Doctor Appointment',
          start: { dateTime: '2024-12-02T14:00:00Z', timeZone: 'UTC' },
          end: { dateTime: '2024-12-02T14:30:00Z', timeZone: 'UTC' },
        },
      ];
      mockCalendarService.getAllEvents.mockResolvedValue(result);

      const response = await calendarController.getAllEvents('primary');
      expect(response).toEqual(result);
    });

    it('should throw a 404 error if calendar not found', async () => {
      mockCalendarService.getAllEvents.mockRejectedValue(new Error('Calendar not found'));

      try {
        await calendarController.getAllEvents('primary');
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException);
        expect(e.getStatus()).toBe(HttpStatus.NOT_FOUND);
      }
    });

    it('should throw a 400 error on other errors', async () => {
      mockCalendarService.getAllEvents.mockRejectedValue(new Error('Bad request'));

      try {
        await calendarController.getAllEvents('primary');
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException);
        expect(e.getStatus()).toBe(HttpStatus.BAD_REQUEST);
      }
    });
  });

  describe('getAllCalendars', () => {
    it('should return all calendars', async () => {
      const result = [
        {
          id: 'primary',
          summary: 'My Primary Calendar',
          timeZone: 'UTC',
        },
        {
          id: 'work@domain.com',
          summary: 'Work Calendar',
          timeZone: 'Europe/Warsaw',
        },
      ];
      mockCalendarService.getAllCalendars.mockResolvedValue(result);

      const response = await calendarController.getAllCalendars();
      expect(response).toEqual(result);
    });
  });

  describe('createCalendar', () => {
    it('should successfully create a calendar', async () => {
      const createCalendarDto: CreateCalendarDto = {
        summary: 'My New Calendar',
        description: 'This is a description for my new calendar',
      };
      const result = {
        kind: 'calendar#calendar',
        id: 'new_calendar_id@group.calendar.google.com',
        summary: 'My New Calendar',
        description: 'This is a description for my new calendar',
      };
      mockCalendarService.createCalendar.mockResolvedValue(result);

      const response = await calendarController.createCalendar(createCalendarDto);
      expect(response).toEqual(result);
    });

    it('should throw an error if calendar creation fails', async () => {
      const createCalendarDto: CreateCalendarDto = {
        summary: 'My New Calendar',
      };
    
      mockCalendarService.createCalendar.mockRejectedValueOnce(
        new HttpException('Failed to create calendar', HttpStatus.BAD_REQUEST),
      );
    
      await expect(calendarController.createCalendar(createCalendarDto))
        .rejects
        .toThrowError(new HttpException('Failed to create calendar', HttpStatus.BAD_REQUEST));
    });    
  });
});
