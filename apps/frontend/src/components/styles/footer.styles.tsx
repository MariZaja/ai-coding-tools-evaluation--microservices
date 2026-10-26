import { AppBar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { COLORS } from '../../constants/colors';

export const StyledFooter = styled(AppBar)({
  backgroundColor: COLORS.background,
  boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.1)', // Shadow on the top side
  position: 'fixed', // Keep it at the bottom
  bottom: 0,
  left: 0,
  right: 0,
  height: '60px', // Height for spacing around the logo
});

export const Logo = styled('img')({
  position: 'absolute', // Use absolute positioning for the logo
  left: '8px', // Align to the left
  top: '50%', // Center vertically
  transform: 'translateY(-50%)', // Perfect vertical centering
  height: '40px', // Logo height
});