import React from 'react';
import { StyledFooter, Logo } from './styles/footer.styles';

const Footer: React.FC = () => (
  <StyledFooter position="static">
    <Logo src="/assets/logo.png" alt="Logo" />
  </StyledFooter>
);

export default Footer;