import axios from 'axios';

import AxiosInstance from '@/config/axiosConfig';

// Start or get existing DM
interface StartDMInput {
  recipientId: string;
  workspaceId: string;
  token: string;
}

export const startDMRequest = async ({ recipientId, workspaceId, token }: StartDMInput) => {
  try {
    const response = await AxiosInstance.post(
      '/dms/start',
      { recipientId, workspaceId },
      {
        headers: {
          'x-access-token': token,
        },
      }
    );
    return response?.data?.data;
  } catch (error) {
    console.log('Error in start DM request', error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

// Get all DMs for a user in a workspace
interface GetAllDMsInput {
  workspaceId: string;
  token: string;
}

export const getAllDMsRequest = async ({ workspaceId, token }: GetAllDMsInput) => {
  try {
    const response = await AxiosInstance.get(`/dms/workspace/${workspaceId}`, {
      headers: {
        'x-access-token': token,
      },
    });
    return response?.data?.data;
  } catch (error) {
    console.log('Error in get all DMs request', error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

// Get DM by ID with messages
interface GetDMByIdInput {
  roomId: string;
  token: string;
}

export const getDMByIdRequest = async ({ roomId, token }: GetDMByIdInput) => {
  try {
    const response = await AxiosInstance.get(`/dms/${roomId}`, {
      headers: {
        'x-access-token': token,
      },
    });
    return response?.data?.data;
  } catch (error) {
    console.log('Error in get DM by ID request', error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

// Send message in DM
interface SendDMMessageInput {
  roomId: string;
  body: string;
  image?: string;
  token: string;
}

export const sendDMMessageRequest = async ({
  roomId,
  body,
  image,
  token,
}: SendDMMessageInput) => {
  try {
    const response = await AxiosInstance.post(
      `/dms/${roomId}/message`,
      { body, image },
      {
        headers: {
          'x-access-token': token,
        },
      }
    );
    return response?.data?.data;
  } catch (error) {
    console.log('Error in send DM message request', error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};
