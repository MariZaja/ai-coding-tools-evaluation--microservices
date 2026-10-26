import React, { useState } from 'react';
import { useAuth } from 'src/context/AuthContext';
import {
  SignUpPageContainer,
  Logo,
  SignUpButton,
  StyledTextField,
} from './styles/signup.styles';

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { registerUser } = useAuth();

  const isButtonDisabled = !(email && username && password);

  const handleSignUp = () => {
    registerUser(email, username, password);
  };

  return (
    <SignUpPageContainer>
      <Logo src="/assets/logo.png" alt="App Logo" />
      <StyledTextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!email && email !== ''}
        helperText={!email && email !== '' ? 'Email is required' : ''}
      />
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
      <SignUpButton
        variant="contained"
        disabled={isButtonDisabled}
        onClick={handleSignUp}
      >
        SIGN UP
      </SignUpButton>
    </SignUpPageContainer>
  );
};

export default SignUpPage;
