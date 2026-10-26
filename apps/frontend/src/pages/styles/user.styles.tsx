import { styled, Paper, Typography } from '@mui/material';
import { COLORS } from '../../constants/colors';

export const StyledHeader = styled(Typography)(() => ({
  fontFamily: 'Helvetica Neue',
  fontWeight: 'bold',
  fontSize: '48px',
  color: COLORS.header,
  mb: 2,
  paddingBottom: '25px',
}));

export const StyledCard = styled(Paper)(() => ({
  padding: '10px',
  backgroundColor: COLORS.cardBackground,
  borderRadius: '8px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
  cursor: 'pointer',
  transition: 'transform 0.2s',
  '&:hover': { transform: 'scale(1.05)' },
}));

export const StyledGardenImage = styled('img')(() => ({
  width: '100%',
  height: '150px',
  objectFit: 'cover',
  borderRadius: '5px',
}));

export const StyledGardenName = styled(Typography)(() => ({
  fontFamily: 'Helvetica Neue',
  fontWeight: 'bold',
  fontSize: '18px',
  color: COLORS.header,
  marginTop: '10px',
}));

export const StyledGardenSurrounding = styled(Typography)(() => ({
  fontFamily: 'Arial',
  fontSize: '14px',
  color: '#3A2E39',
  marginTop: '5px',
}));