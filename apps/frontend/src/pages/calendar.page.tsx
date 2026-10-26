import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import './styles/calendar.css';
import { Event } from '../models/Event';
import { getEvents } from '../services';
import {
  CalendarContainer,
  StyledPaper,
} from './styles/calendar.styles';
import { Box, Dialog, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { PopupHeader, StyledPopupContainer, SaveButton} from './styles/popup.styles';

const localizer = momentLocalizer(moment);

const CustomCalendar: React.FC = () => {
  const [events, setEvents] = useState([] as Event[]);
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const calendarId =
    'c483465fab0c6d7bc7bc950678b827f5a894904fd0c949899526e5d2f4416a88@group.calendar.google.com';

  useEffect(() => {
    getEvents(calendarId).then((data) => {
      setEvents(data || []);
    });
  }, []);


  return (
    <CalendarContainer>
      <StyledPaper>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{
            height: '80vh',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            padding: '10px',
          }}
          onSelectEvent={(event) => {
            window.open(event.link, '_blank'); // Open event link in a new tab
          }}
          eventPropGetter={(event) => {
            const backgroundColor = event.allDay ? '#F2EFD7' : '#8fbb94';
            return {
              style: {
                backgroundColor,
                color: 'white',
                borderRadius: '6px',
                height: '30px',
                fontSize: '14px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              },
            };
          }}
          toolbar={true}
        />
      </StyledPaper>

      <Dialog open={open} onClose={handleClose}>
        <StyledPopupContainer>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <PopupHeader variant="h6">Calendar Information</PopupHeader>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography variant="body1">
              The calendar feature is still under development. Once implemented,
              it will display personalized events, such as watering schedules
              for each plant in your garden or reminders for tasks like trimming
              and maintenance.
          </Typography>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <SaveButton onClick={handleClose}>
              Ok
            </SaveButton>
          </Box>
        </StyledPopupContainer>
      </Dialog>
    </CalendarContainer>
  );
};

export default CustomCalendar;
