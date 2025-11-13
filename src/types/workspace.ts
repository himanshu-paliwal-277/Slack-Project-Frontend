// User type for workspace members
export interface User {
  _id: string;
  userName: string;
  email: string;
  avatar?: string;
  name?: string; // Some contexts use 'name' instead of 'userName'
}

// Workspace member type from WorkspaceContext
export interface WorkspaceMemberFromContext {
  memberId: {
    _id: string;
    name: string;
  };
  role: string;
}

// Workspace member type with full user info (API response)
export interface WorkspaceMember {
  memberId: User;
  role: 'admin' | 'member';
  _id?: string;
}

// Channel type
export interface Channel {
  _id: string;
  name: string;
  type?: string;
  workspaceId?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Workspace type (basic)
export interface Workspace {
  _id: string;
  name: string;
  members: WorkspaceMember[];
  channels: string[] | Channel[]; // Can be either string IDs or full Channel objects
  createdAt?: string;
  updatedAt?: string;
}

// DM type
export interface DM {
  _id: string;
  members: User[];
  workspaceId: string;
  createdAt?: string;
  updatedAt?: string;
}
