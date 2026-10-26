import React, { useState } from 'react';
import { useAuth } from 'src/context/AuthContext';
import {
  LoginPageContainer,
  Logo,
  LoginButton,
  StyledTextField,
} from './styles/login.styles';
import { Dialog, Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {
  PopupHeader,
  StyledPopupContainer,
  SaveButton,
} from './styles/popup.styles';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useAuth();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const isButtonDisabled = !(username && password);

  const handleLogin = () => {
    loginUser(username, password);
  };

  return (
    <LoginPageContainer>
      <Logo src="/assets/logo.png" alt="App Logo" />
      <StyledTextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={!username && username !== ''}
        helperText={!username && username !== '' ? 'Username is required' : ''}
      />
      <StyledTextField
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!password && password !== ''}
        helperText={!password && password !== '' ? 'Password is required' : ''}
      />
      <LoginButton
        variant="contained"
        disabled={isButtonDisabled}
        onClick={handleLogin}
      >
        Login
      </LoginButton>

      <Dialog open={open} onClose={handleClose}>
        <StyledPopupContainer>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <PopupHeader variant="h6">Login Information</PopupHeader>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography variant="body1">
            The user register feature is still under development. Until implemented,
            access to the app is only with admin user. The credentials are:
            admin / admin.
          </Typography>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <SaveButton onClick={handleClose}>Ok</SaveButton>
          </Box>
        </StyledPopupContainer>
      </Dialog>
    </LoginPageContainer>
  );
};

export default LoginPage;
