import React, { createContext, useState } from 'react';

interface WorkspacePreferencesModalContextType {
  openPreferences: boolean;
  setOpenPreferences: React.Dispatch<React.SetStateAction<boolean>>;
  initialValue: string;
  setInitialValue: React.Dispatch<React.SetStateAction<string>>;
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

  return (
    <WorkspacePreferencesModalContext.Provider
      value={{ openPreferences, setOpenPreferences, initialValue, setInitialValue }}
    >
      {children}
    </WorkspacePreferencesModalContext.Provider>
  );
};

export { WorkspacePreferencesModalContext };
export default WorkspacePreferencesModalContextProvider;
