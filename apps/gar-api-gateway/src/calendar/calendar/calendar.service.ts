import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { google } from 'googleapis';

/**
 * author: chatGPT
 */
@Injectable()
export class CalendarService {
  private calendar = google.calendar('v3');
  private readonly tokenEndpoint = 'https://oauth2.googleapis.com/token';
  private oauth2Client;

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI,
    );

    this.oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });
  }

  private async refreshAccessToken(): Promise<string> {
    try {
      const response = await axios.post(this.tokenEndpoint, null, {
        params: {
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
          grant_type: 'refresh_token',
        },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      const { access_token } = response.data;

      if (!access_token) {
        throw new Error('Failed to refresh access token: Missing access token in response');
      }

      this.oauth2Client.setCredentials({ access_token });

      return access_token;
    } catch (error) {
      throw new HttpException(
        `Failed to refresh access token: ${error.response?.data?.error || error.message}`,
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  private async ensureAccessToken(): Promise<void> {
    try {
      const tokenInfo = await this.oauth2Client.getAccessToken();
      if (!tokenInfo.token) {
        await this.refreshAccessToken();
      }
    } catch {
      await this.refreshAccessToken();
    }
  }

  async addEvent(calendarId: string, eventData: { summary: string; description?: string; start: string; end: string; timeZone: string }) {
    await this.ensureAccessToken();
    
    try {
      const response = await this.calendar.events.insert({
        auth: this.oauth2Client,
        calendarId,
        requestBody: {
          summary: eventData.summary,
          description: eventData.description,
          start: {
            dateTime: eventData.start,
            timeZone: eventData.timeZone,
          },
          end: {
            dateTime: eventData.end,
            timeZone: eventData.timeZone,
          },
        },
      });

      return response.data;
    } catch (error) {
      throw new HttpException(
        `Failed to add event: ${error.response?.data?.error?.message || error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getEvents(calendarId: string = 'primary', pageToken?: string) {
    await this.ensureAccessToken();
  
    try {
      const response = await this.calendar.events.list({
        calendarId,
        auth: this.oauth2Client,
        pageToken,
      });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        const apiError = error.response.data.error;
  
        if (apiError.code === 404) {
          throw new Error(`Calendar with ID "${calendarId}" not found.`);
        } else if (apiError.code === 403) {
          throw new Error(`Access to calendar "${calendarId}" is forbidden.`);
        }
      }
  
      throw new Error(`Failed to fetch events: ${error.message}`);
    }
  }

  async getAllEvents(calendarId: string = 'primary') {
    let allEvents = [];
    let nextPageToken: string | undefined;
    await this.ensureAccessToken();
  
    try {
      do {
        const response = await this.getEvents(calendarId, nextPageToken);
        allEvents = allEvents.concat(response.items);
        nextPageToken = response.nextPageToken;
      } while (nextPageToken);
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        const apiError = error.response.data.error;
  
        if (apiError.code === 404) {
          throw new Error(`Calendar with ID "${calendarId}" not found.`);
        } else if (apiError.code === 403) {
          throw new Error(`Access to calendar "${calendarId}" is forbidden.`);
        }
      }
  
      throw new Error(`Failed to retrieve all events: ${error.message}`);
    }
  
    return allEvents;
  }
  

  async createCalendar(calendarData: { summary: string; description?: string }) {
    await this.ensureAccessToken();
    try {
      const response = await this.calendar.calendars.insert({
        auth: this.oauth2Client,
        requestBody: {
          summary: calendarData.summary,
          description: calendarData.description,
        },
      });

      return response.data;
    } catch (error) {
      throw new HttpException(
        `Failed to create calendar: ${error.response?.data?.error?.message || error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllCalendars() {
    await this.ensureAccessToken();
    try {
      const response = await this.calendar.calendarList.list({
        auth: this.oauth2Client,
      });

      return response.data.items.map((calendar) => ({
        id: calendar.id,
        summary: calendar.summary,
        description: calendar.description || 'No description available',
        timeZone: calendar.timeZone,
      }));
    } catch (error) {
      throw new HttpException(
        `Failed to fetch calendars: ${error.response?.data?.error?.message || error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  
}
