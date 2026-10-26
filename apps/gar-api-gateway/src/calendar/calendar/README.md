# Calendar

This service provides integration with the Google Calendar API, allowing you to manage calendars and events programmatically.

## Features

- Create new calendars
- Retrieve all calendars
- Add events to a calendar
- Retrieve events from a calendar
- Retrieve all events from a calendar

### OAuth2 Overview

OAuth2 is an authorization framework that allows applications to obtain limited access to user accounts on an HTTP service, such as Google Calendar. It works by delegating user authentication to the service that hosts the user account and authorizing third-party applications to access the user account.

#### Key Concepts

- **Client ID and Client Secret**: These are unique credentials provided by the service (e.g., Google) to identify your application.
- **Redirect URI**: The URL to which the service will redirect users after they authorize your application.
- **Authorization Code**: A temporary code that the client will exchange for an access token.
- **Access Token**: A token that grants the client access to the user's resources.
- **Refresh Token**: A token used to obtain a new access token when the current one expires.

#### OAuth2 Flow

1. **Authorization Request**: The client directs the user to the service's authorization server.
2. **User Authorization**: The user logs in and authorizes the client.
3. **Authorization Response**: The service redirects the user back to the client with an authorization code.
4. **Token Exchange**: The client exchanges the authorization code for an access token and a refresh token.
5. **API Requests**: The client uses the access token to access the user's resources.
6. **Token Refresh**: When the access token expires, the client uses the refresh token to obtain a new access token.

These credentials should be set in the `.env` file as shown in the setup section. The service uses environment variables defined in the `docker-compose.yml` file.
```sh
GOOGLE_CLIENT_ID=your_google_client_id  
GOOGLE_CLIENT_SECRET=your_google_client_secret  
GOOGLE_REDIRECT_URI=your_google_redirect_uri  
GOOGLE_REFRESH_TOKEN=your_google_refresh_token  
```

### Access Token Management

The service uses OAuth2 for authentication and authorization. During the application execution, the access token is managed as follows:

- The OAuth2 client is initialized with client ID, client secret, and redirect URI from environment variables.
- The refresh token is set in the OAuth2 client credentials.
- The `ensureAccessToken` method checks if the access token is available and valid.
- If the access token is missing or expired, the `refreshAccessToken` method is called to obtain a new access token using the refresh token.
- The new access token is then set in the OAuth2 client credentials.

## Usage

### Create a Calendar

Endpoint: `POST /calendar/create`

Request Body:
```json
{
  "summary": "My New Calendar",
  "description": "This is a description for my new calendar"
}
```

### Retrieve All Calendars

Endpoint: `GET /calendar`

### Add an Event

Endpoint: `POST /calendar/events`

Query Parameters:
- `calendarId` (optional): The ID of the calendar to add the event to. Defaults to "primary".

Request Body:
```json
{
  "summary": "Team Meeting",
  "description": "Discussion about project updates",
  "start": "2024-12-01T10:00:00Z",
  "end": "2024-12-01T11:00:00Z",
  "timeZone": "UTC"
}
```

### Retrieve Events

Endpoint: `GET /calendar/events`

Query Parameters:
- `calendarId` (optional): The ID of the calendar to fetch events from. Defaults to "primary".
- `pageToken` (optional): Token for the next page of results. Used for pagination.

### Retrieve All Events

Endpoint: `GET /calendar/all-events`

Query Parameters:
- `calendarId` (optional): The ID of the calendar to fetch events from. Defaults to "primary".

## Integration with Google Calendar API

This service uses the Google Calendar API to manage calendars and events. It handles OAuth2 authentication and token refresh automatically.

### OAuth2 Setup

The service uses OAuth2 for authentication. Ensure you have the following credentials from the Google Developer Console:
- Client ID
- Client Secret
- Redirect URI
- Refresh Token

These credentials should be set in the `.env` file as shown in the setup section.

## Error Handling

The service returns appropriate HTTP status codes and error messages for various failure scenarios, such as invalid input, unauthorized access, and API errors.

## Author

This service was generated with the help of GitHub Copilot.