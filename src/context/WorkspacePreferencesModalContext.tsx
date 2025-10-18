import React, { createContext, useState } from 'react';

interface WorkspacePreferencesModalContextType {
  openPreferences: boolean;
  setOpenPreferences: React.Dispatch<React.SetStateAction<boolean>>;
  initialValue: string;
  setInitialValue: React.Dispatch<React.SetStateAction<string>>;
  workspace: {
    _id: string;
    name: string;
    members: { memberId: string; role: string }[];
  } | null;
  setWorkspace: React.Dispatch<React.SetStateAction<{
    _id: string;
    name: string;
    members: { memberId: string; role: string }[];
  } | null>>;
}

const WorkspacePreferencesModalContext = createContext<WorkspacePreferencesModalContextType | null>(
  null
);

interface IProps {
  children: React.ReactNode;
}

const WorkspacePreferencesModalContextProvider: React.FC<IProps> = ({ children }) => {
  const [openPreferences, setOpenPreferences] = useState(false);
  const [initialValue, setInitialValue] = useState('Edit Workspace');
  const [workspace, setWorkspace] = useState<{
    _id: string;
    name: string;
    members: { memberId: string; role: string }[];
  } | null>(null);

  return (
    <WorkspacePreferencesModalContext.Provider
      value={{
        openPreferences,
        setOpenPreferences,
        initialValue,
        setInitialValue,
        workspace,
        setWorkspace,
      }}
    >
      {children}
    </WorkspacePreferencesModalContext.Provider>
  );
};

export { WorkspacePreferencesModalContext };
export default WorkspacePreferencesModalContextProvider;
