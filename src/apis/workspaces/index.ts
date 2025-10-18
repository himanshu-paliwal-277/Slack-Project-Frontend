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
      throw error.response.data;
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
