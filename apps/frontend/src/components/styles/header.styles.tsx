import { styled } from '@mui/system';
import { Button } from '@mui/material';
import { COLORS } from 'src/constants/colors';

// Styled buttons
export const SignInButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#8FC496',
  color: '#FFFFFF',
  fontWeight: 'bold',
  fontFamily: 'Verdana, sans-serif',
  fontSize: '14px',
  margin: theme.spacing(0, 1),
  '&:hover': {
    backgroundColor: '#BCDCC0',
  },
}));

export const RegisterButton = styled(Button)(({ theme }) => ({
  backgroundColor: COLORS.button,
  color: '#FFFFFF',
  fontWeight: 'bold',
  fontFamily: 'Verdana, sans-serif',
  fontSize: '14px',
  margin: theme.spacing(0, 1),
  '&:hover': {
    backgroundColor: COLORS.onHoverButton,
  },
}));

// Styled clickable links
export const HeaderLink = styled('span')(({ theme }) => ({
  color: '#363732',
  fontFamily: 'Helvetica Neue, sans-serif',
  fontWeight: 'bold',
  fontSize: '16px',
  cursor: 'pointer',
  padding: theme.spacing(1, 2),
  '&:hover': {
    color: '#BCDCC0',
  },
}));
