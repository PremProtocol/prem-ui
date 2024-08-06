import React, { createContext, useContext, useState, ReactNode } from 'react';

interface VersionContextProps {
  selectedVersion: string;
  setSelectedVersion: (version: string) => void;
}

const VersionContext = createContext<VersionContextProps | undefined>(undefined);

export const VersionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedVersion, setSelectedVersion] = useState('v0_1');

  return (
    <VersionContext.Provider value={{ selectedVersion, setSelectedVersion }}>
      {children}
    </VersionContext.Provider>
  );
};

export const useVersion = (): VersionContextProps => {
  const context = useContext(VersionContext);
  if (!context) {
    throw new Error('useVersion must be used within a VersionProvider');
  }
  return context;
};