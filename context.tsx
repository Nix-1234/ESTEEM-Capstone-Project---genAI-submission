
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, Nudge } from './types';
import { nudges as initialNudges } from './data';

interface UserContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('employee');
  return (
    <UserContext.Provider value={{ role, setRole }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};

interface NudgeContextType {
  activeNudges: Nudge[];
  dismissNudge: (id: string) => void;
}

const NudgeContext = createContext<NudgeContextType | undefined>(undefined);

export const NudgeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeNudges, setActiveNudges] = useState<Nudge[]>(initialNudges);

  const dismissNudge = (id: string) => {
    setActiveNudges(prev => prev.filter(n => n.id !== id));
  };

  return (
    <NudgeContext.Provider value={{ activeNudges, dismissNudge }}>
      {children}
    </NudgeContext.Provider>
  );
};

export const useNudges = () => {
  const context = useContext(NudgeContext);
  if (!context) throw new Error('useNudges must be used within NudgeProvider');
  return context;
};
