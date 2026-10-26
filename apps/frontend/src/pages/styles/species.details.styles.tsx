import { styled } from '@mui/material/styles';
import { Box, Paper, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  flexDirection: 'column',
  alignItems: 'center',
});

export const StyledParametersBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: COLORS.onHoverButton,
  paddingBottom: '20px',
  marginTop: '20px',
  borderRadius: 20,
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  width: '80%',
});

export const StyledImage = styled('img')({
  marginTop: '20px',
  width: '600px',
  height: '350px',
  borderRadius: 20,
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)',
});

export const OverlayBox1 = styled(Box)({
  position: 'absolute',
  top: '0%',
  left: '500px',
  width: '90%',
  minHeight: '30%',
  backgroundColor: '#A77464',
  borderRadius: 20,
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  padding: '10px',
});

export const OverlayBox2 = styled(Box)({
  width: '95%',
  minHeight: '90%',
  backgroundColor: '#F2EFD7',
  borderRadius: 20,
  padding: '15px',
});

export const StyledGridItem = styled(Grid)({
  fontSize: '16px',
  color: '#3A2E39',
  fontWeight: 400,
  fontStyle: 'italic',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '5px',
});

export const Icon = styled(FontAwesomeIcon)({
  marginRight: '10px',
  fontSize: 18,
});
