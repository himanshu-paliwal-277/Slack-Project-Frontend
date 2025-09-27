import axios from 'axios';

interface SignupInput {
  email: string;
  password: string;
  username: string;
}

interface SigninInput {
  email: string;
  password: string;
}

export const signUpRequest = async ({ email, password, username }: SignupInput) => {
  try {
    const response = await axios.post('/users/signup', {
      email,
      password,
      username,
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
    const response = await axios.post('/users/signin', {
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
