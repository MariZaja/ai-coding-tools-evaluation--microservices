import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Box } from '@mui/material';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  HeaderLink,
  SignInButton,
  RegisterButton,
} from './styles/header.styles';
import { useAuth } from 'src/context/AuthContext';

const Header: React.FC = () => {
  const [activeLink, setActiveLink] = useState<string>('');
  const { isLoggedIn, logout } = useAuth();

  useEffect(() => {
    // Retrieve the active link from localStorage when the component mounts
    const savedActiveLink = localStorage.getItem('activeLink');
    if (savedActiveLink) {
      setActiveLink(savedActiveLink);
    }
  }, []);

  const handleLinkClick = (link: string, url: string) => {
    setActiveLink(link);
    localStorage.setItem('activeLink', link); // Save the active link to localStorage
    window.location.href = url;
  };

  return (
    <AppBar
      position="absolute"
      color="transparent"
      elevation={0}
      sx={{
        borderBottom: '1px solid #F2EFD7',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', padding: '0 20px' }}>
        <Box>
          <img
            src="/assets/main_logo.png"
            alt="Garden Genius Logo"
            style={{ height: 40 }}
          />
        </Box>
        <Box display="flex" alignItems="center">
          {/* Conditional rendering for buttons */}
          {isLoggedIn() ? (
            <>
              <HeaderLink
                onClick={() => handleLinkClick('Home', '/user')}
                style={{ color: activeLink === 'Home' ? '#8FC496' : undefined }}
              >
                Home
              </HeaderLink>
              <HeaderLink
                onClick={() => handleLinkClick('Database', '/species')}
                style={{
                  color: activeLink === 'Database' ? '#8FC496' : undefined,
                }}
              >
                Database
              </HeaderLink>
              <HeaderLink
                onClick={() => handleLinkClick('Calendar', '/calendar')}
                style={{
                  color: activeLink === 'Calendar' ? '#8FC496' : undefined,
                }}
              >
                <FontAwesomeIcon icon={faCalendarDays} size="lg" />
              </HeaderLink>
              <RegisterButton onClick={logout}>Sign Out</RegisterButton>
            </>
          ) : (
            <>
              <SignInButton onClick={() => (window.location.href = '/login')}>
                Sign In
              </SignInButton>
              <RegisterButton
                onClick={() => (window.location.href = '/signup')}
              >
                Sign up
              </RegisterButton>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
