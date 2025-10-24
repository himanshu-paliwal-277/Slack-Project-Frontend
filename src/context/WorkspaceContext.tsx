import React, { createContext, useState } from 'react';

interface WorkspaceContextType {
  currentWorkspace: {
    _id: string;
    name: string;
    members: { memberId: { _id: string; name: string }; role: string }[];
  } | null;
  setCurrentWorkspace: React.Dispatch<
    React.SetStateAction<{
      _id: string;
      name: string;
      members: { memberId: { _id: string; name: string }; role: string }[];
    } | null>
  >;
}

const WorkspaceContext = createContext<WorkspaceContextType | null>(null);

interface IProps {
  children: React.ReactNode;
}

export const WorkspaceContextProvider: React.FC<IProps> = ({ children }) => {
  const [currentWorkspace, setCurrentWorkspace] = useState<{
    _id: string;
    name: string;
    members: { memberId: { _id: string; name: string }; role: string }[];
  } | null>(null);

  return (
    <WorkspaceContext.Provider value={{ currentWorkspace, setCurrentWorkspace }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export default WorkspaceContext;
