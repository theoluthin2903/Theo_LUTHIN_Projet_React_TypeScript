import React, { createContext, useContext, useState } from "react";

interface ProfileContextType {
  username: string;
  setUsername: (username: string) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState("");

  return (
    <ProfileContext.Provider value={{ username, setUsername }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile doit être utilisé au sein de ProfileProvider");
  }
  return context;
};