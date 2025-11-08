import axios from 'axios';

import AxiosInstance from '@/config/axiosConfig';

export const getChannelById = async (channelId: string, token: string) => {
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

interface GetPaginatedMessagesInput {
  channelId: string;
  limit?: number;
  offset?: number;
  token: string;
}

export const getPaginatedMessages = async ({
  channelId,
  limit,
  offset,
  token,
}: GetPaginatedMessagesInput) => {
  try {
    const response = await AxiosInstance.get(`/messages/${channelId}`, {
      params: {
        limit: limit || 20,
        offset: offset || 0,
      },
      headers: {
        'x-access-token': token,
      },
    });
    return response?.data?.data;
  } catch (error) {
    console.log('Error in getPaginatedMessagesRequest', error);
  }
};
