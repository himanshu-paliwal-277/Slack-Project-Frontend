import axios from 'axios';

import AxiosInstance from '@/config/axiosConfig';

export const getChannelDetailsById = async (channelId: string, token: string) => {
  try {
    const response = await AxiosInstance.get(`/channels/${channelId}`, {
      headers: {
        'x-access-token': token,
      },
    });
    return response?.data?.data;
  } catch (error) {
    console.log('Error in fetching channel details request', error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};
