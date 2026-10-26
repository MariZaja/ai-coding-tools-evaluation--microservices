import { Button, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { COLORS } from '../../constants/colors';

export const HomePageContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: COLORS.background,
  textAlign: 'center',
});

export const WelcomeTextLine = styled(Typography)({
  fontFamily: 'Helvetica Neue, sans-serif',
  fontSize: '75px',
  fontWeight: 'bold',
  color: '#8FC496',
  lineHeight: 1.2,
  marginBottom: '20px',
});

export const SignInButton = styled(Button)({
  fontFamily: 'Verdana, sans-serif',
  fontSize: '14px',
  fontWeight: 'bold',
  color: '#FFFFFF',
  backgroundColor: COLORS.button,
  '&:hover': {
    backgroundColor: COLORS.onHoverButton,
  },
});
