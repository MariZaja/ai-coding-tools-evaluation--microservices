import axios from 'axios';
import { handleError } from '../helpers/ErrorHandler';
import { UserProfileToken } from '../models/User';

// const port = process.env.REACT_APP_GATEWAY_PORT;
const port = 3000;
const api = `http://localhost:${port}/`;

export const loginAPI = async (username: string, password: string) => {
  console.log('PORT: ',port);
  try {
    const data = await axios.post<UserProfileToken>(api + 'auth/login', {
      username: username,
      password: password,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const registerAPI = async (
  email: string,
  username: string,
  password: string,
) => {
  try {
    const data = await axios.post<UserProfileToken>(api + 'users', {
      email: email,
      username: username,
      password: password,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getCurrentUser = async () => {
  const user = JSON.parse(localStorage.getItem('user') ?? '{}');
  try {
    const result = await axios.post<{id: String}>(api + 'auth/user', {
      username: user?.username,
    });
    return result;
  } catch (error) {
    handleError(error);
  }
};