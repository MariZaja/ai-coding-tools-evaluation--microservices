import { styled, Paper, Typography, Button, Box } from '@mui/material';
import { COLORS } from '../../constants/colors';

export const StyledPopupContainer = styled(Paper)(() => ({
  padding: '20px',
  minWidth: '400px',
  backgroundColor: COLORS.cardBackground, // Same as StyledCard background
  borderRadius: '16px', // Doubled corner rounding
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Same shadow
  display: 'flex',
  flexDirection: 'column',
}));

export const PopupHeader = styled(Typography)(() => ({
  fontFamily: 'Helvetica Neue', // Same font as StyledHeader
  fontWeight: 'bold',
  fontSize: '24px', // Smaller size than StyledHeader
  color: COLORS.header, // Use the same color as StyledHeader
  marginBottom: '15px',
}));

export const StyledForm = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  marginTop: '10px',
}));

export const SaveButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#8FC496',
  color: '#FFFFFF',
  fontWeight: 'bold',
  fontFamily: 'Verdana, sans-serif',
  fontSize: '14px',
  margin: theme.spacing(0, 1),
  '&:hover': {
    backgroundColor: '#BCDCC0',
  },
  '&:disabled': {
    backgroundColor: '#D3D3D3',
    color: '#A9A9A9',
  },
}));

export const CancelButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#A77464',
  color: '#FFFFFF',
  fontWeight: 'bold',
  fontFamily: 'Verdana, sans-serif',
  fontSize: '14px',
  margin: theme.spacing(0, 1),
  '&:hover': {
    backgroundColor: '#F2EFD7',
  },
}));
