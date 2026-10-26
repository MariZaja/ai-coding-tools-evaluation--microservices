import axios from 'axios';
import { handleError } from '../helpers/ErrorHandler';
import { Event } from '../models/Event';

// const port = process.env.REACT_APP_GATEWAY_PORT;
const port = 3000;
const api = `http://localhost:${port}/`;

export const getEvents = async (calendarId: string) => {
  try {
    const response = await axios.get<Event[]>(api + 'calendar/all-events?calendarId=' + calendarId);
    const data = response.data;

    const transformedEvents = data.map((event: any) => ({
      title: event.summary,
      start: new Date(event.start.dateTime || event.start.date),
      end: new Date(event.end.dateTime || event.end.date),
      allDay: !event.start.dateTime,
      description: event.description,
      link: event.htmlLink,
    }));

    return transformedEvents;
  } catch (error) {
    handleError(error);
  }
}
