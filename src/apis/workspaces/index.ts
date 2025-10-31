import axios from 'axios';

import AxiosInstance from '@/config/axiosConfig';

interface CreateWorkspaceInput {
  name: string;
  description: string;
  token: string;
}

export const createWorkspaceRequest = async ({
  name,
  description,
  token,
}: CreateWorkspaceInput) => {
  try {
    const response = await AxiosInstance.post(
      '/workspaces',
      { name, description },
      {
        headers: {
          'x-access-token': token,
        },
      }
    );
    console.log('Response in create workspace request', response);
    return response?.data?.data;
  } catch (error) {
    console.log('Error in create workspace request', error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

interface FetchWorkspaceInput {
  token: string;
}

export const fetchWorkspacesRequest = async ({ token }: FetchWorkspaceInput) => {
  try {
    const response = await AxiosInstance.get('/workspaces', {
      headers: {
        'x-access-token': token,
      },
    });
    console.log('Response in fetch workspace request', response);
    return response?.data?.data;
  } catch (error) {
    console.log('Error in fetching workspace request', error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

export const fetchWorkspaceDetailsRequest = async (workspaceId: string, token: string) => {
  try {
    const response = await AxiosInstance.get(`/workspaces/${workspaceId}`, {
      headers: {
        'x-access-token': token,
      },
    });
    return response?.data?.data;
  } catch (error) {
    console.log('Error in fetching workspace details request', error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response;
    }
    throw error;
  }
};

export const deleteWorkspaceRequest = async (workspaceId: string, token: string) => {
  try {
    const response = await AxiosInstance.delete(`/workspaces/${workspaceId}`, {
      headers: {
        'x-access-token': token,
      },
    });
    return response?.data?.data;
  } catch (error) {
    console.log('Error in deleting workspace request', error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

interface UpdateWorkspaceInput {
  workspaceId: string;
  name: string;
  description: string;
  token: string;
}

export const updateWorkspaceRequest = async ({
  workspaceId,
  name,
  description,
  token,
}: UpdateWorkspaceInput) => {
  try {
    const response = await AxiosInstance.put(
      `/workspaces/${workspaceId}`,
      { name, description },
      {
        headers: {
          'x-access-token': token,
        },
      }
    );
    return response?.data?.data;
  } catch (error) {
    console.log('Error in updating workspace request', error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

interface AddChannelInput {
  workspaceId: string;
  channelName: string;
  token: string;
}

export const addChannelToWorkspaceRequest = async ({
  workspaceId,
  channelName,
  token,
}: AddChannelInput) => {
  try {
    const response = await AxiosInstance.put(
      `/workspaces/${workspaceId}/channels`,
      { channelName },
      {
        headers: {
          'x-access-token': token,
        },
      }
    );
    return response?.data?.data;
  } catch (error) {
    console.log('Error in adding channel to workspace request', error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

interface ResetJoinCodeInput {
  workspaceId: string;
  token: string;
}

export const resetJoinCodeRequest = async ({ workspaceId, token }: ResetJoinCodeInput) => {
  try {
    const response = await AxiosInstance.put(
      `/workspaces/${workspaceId}/joinCode/reset`,
      {},
      {
        headers: {
          'x-access-token': token,
        },
      }
    );
    return response?.data?.data;
  } catch (error) {
    console.log('Error in resetting join code request', error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

interface AddMemberInput {
  workspaceId: string;
  token: string;
}

export const addMemberToWorkspaceRequest = async ({ workspaceId, token }: AddMemberInput) => {
  try {
    const response = await AxiosInstance.put(
      `/workspaces/${workspaceId}/members`,
      {},
      {
        headers: {
          'x-access-token': token,
        },
      }
    );
    return response?.data?.data;
  } catch (error) {
    console.log('Error in adding member to workspace request', error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

interface JoinWorkspaceInput {
  workspaceId: string;
  joinCode: string;
  token: string;
}

export const joinWorkspaceRequest = async ({
  workspaceId,
  joinCode,
  token,
}: JoinWorkspaceInput) => {
  try {
    const response = await AxiosInstance.put(
      `/workspaces/${workspaceId}/join`,
      { joinCode },
      {
        headers: {
          'x-access-token': token,
        },
      }
    );
    return response?.data?.data;
  } catch (error) {
    console.log('Error in joining workspace request', error);
    if (axios.isAxiosError(error) && error.response) {
      throw error.response.data;
    }
    throw error;
  }
};
