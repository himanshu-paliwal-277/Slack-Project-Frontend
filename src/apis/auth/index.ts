import axios from 'axios';

import AxiosInstance from '@/config/axiosConfig';

interface SignupInput {
  email: string;
  password: string;
  userName: string;
}

interface SigninInput {
  email: string;
  password: string;
}

export const signUpRequest = async ({ email, password, userName }: SignupInput) => {
  try {
    const response = await AxiosInstance.post('/users/signup', {
      email,
      password,
      userName,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

export const signInRequest = async ({ email, password }: SigninInput) => {
  try {
    const response = await AxiosInstance.post('/users/signin', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};
