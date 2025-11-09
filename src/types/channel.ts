export interface Channel {
  _id: string;
  name: string;
  workspaceId?: {
    _id: string;
    name: string;
    members: Array<{
      _id: string;
      userName: string;
      email: string;
      avatar?: string;
    }>;
  };
  createdAt?: string;
  updatedAt?: string;
}
