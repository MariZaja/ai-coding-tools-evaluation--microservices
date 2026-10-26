import { Box, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { COLORS } from '../../constants/colors';

export const SignUpPageContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  gap: '20px',
  backgroundColor: COLORS.background,
  textAlign: 'center',
});

export const Logo = styled('img')({
  width: '150px',
  marginBottom: '20px',
});

export const StyledTextField = styled(TextField)({
  width: '300px',
  fontFamily: 'Helvetica Neue, sans-serif',
});

export const SignUpButton = styled(Button)({
  width: '300px',
  fontFamily: 'Verdana, sans-serif',
  fontWeight: 'bold',
  color: '#FFFFFF',
  backgroundColor: COLORS.button,
  '&:hover': {
    backgroundColor: COLORS.onHoverButton,
  },
  '&.Mui-disabled': {
    backgroundColor: COLORS.button,
    opacity: 0.6,
  },
});
