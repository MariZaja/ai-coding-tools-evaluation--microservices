import { styled } from '@mui/material/styles';
import { Box, Paper } from '@mui/material';

export const CalendarContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100vw',
  backgroundColor: '#FFFFF6',
});

export const StyledPaper = styled(Paper)({
  width: '80%',
  borderRadius: 20,
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
});


