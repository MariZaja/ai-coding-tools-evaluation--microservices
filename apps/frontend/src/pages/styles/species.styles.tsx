import { styled, TextField, Paper, Typography } from '@mui/material';
import { COLORS } from '../../constants/colors';

export const StyledSearchBar = styled(TextField)(() => ({
  width: '100%',
  maxWidth: '600px',
  margin: '0 auto',
  display: 'block',
  backgroundColor: COLORS.cardBackground,
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  borderRadius: '25px',
  '& .MuiOutlinedInput-root': {
    width: '100%',
    maxWidth: '600px',
    borderRadius: '25px',
    paddingRight: '40px',
    '& fieldset': {
      borderColor: 'transparent', // No border by default
    },
    '&:hover fieldset': {
      borderColor: COLORS.onHoverButton, // Border color on hover
    },
    '&.Mui-focused fieldset': {
      borderColor: COLORS.onHoverButton, // Border color when focused
    },
    '& .MuiInputAdornment-root': {
      position: 'absolute',
      right: '10px',
      color: COLORS.header, // Icon color
    },
  },
  '& .MuiOutlinedInput-input': {
    color: COLORS.button, // Default text color
    '&::placeholder': {
      color: COLORS.header, // Placeholder color
      opacity: 1, // Ensure visibility of placeholder
    },
  },
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

export const StyledPlantImage = styled('img')(() => ({
  width: '100%',
  height: '150px',
  objectFit: 'cover',
  borderRadius: '5px',
  backgroundColor: '#FFF',
}));

export const StyledPlantName = styled(Typography)(() => ({
  fontFamily: 'Helvetica Neue',
  fontWeight: 'bold',
  fontSize: '18px',
  color: COLORS.header,
  marginTop: '10px',
}));
