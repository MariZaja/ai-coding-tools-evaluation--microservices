import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HomePageContainer,
  WelcomeTextLine,
  SignInButton,
} from './styles/home.styles';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/login');
  };

  return (
    <HomePageContainer>
      <WelcomeTextLine>Welcome to</WelcomeTextLine>
      <WelcomeTextLine>Garden Genius App</WelcomeTextLine>
      <SignInButton onClick={handleSignIn} size="large">
        SIGN IN
      </SignInButton>
    </HomePageContainer>
  );
};

export default HomePage;