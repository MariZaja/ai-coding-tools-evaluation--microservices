import { styled } from '@mui/material/styles';
import { Box, Paper } from '@mui/material';
import { COLORS } from 'src/constants/colors';

export const SpeciesContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100vw',
  backgroundColor: '#FFFFF6',
});

export const StyledPaper = styled(Paper)({
  width: '80%',
  backgroundColor: '#F2EFD7',
  borderRadius: 20,
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  padding: 20,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

export const StyledSpecieBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: COLORS.onHoverButton,
  borderRadius: 20,
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  padding: '10px 20px',
  margin: '20px 100px',
  '&:hover': { cursor: 'pointer', backgroundColor: COLORS.button },
});

export const StyledPlantBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: COLORS.onHoverButton,
  borderRadius: 20,
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  padding: '10px 20px',
  margin: '20px 100px',
});

export const StyledNotesBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: COLORS.background,
  borderRadius: 20,
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  padding: '10px 20px',
  margin: '20px 100px',
  width: '500px',
  minHeight: '280px',
});

export const StyledImage = styled('img')({
  width: '450px',
  height: '450px',
  borderRadius: 20,
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)',
});
