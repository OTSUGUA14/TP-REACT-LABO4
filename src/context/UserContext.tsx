// UserContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserContextType {
  rol: string | null;
  setRol: (rol: string | null) => void;
}

interface UserProviderProps {
    children: ReactNode;
  }

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [rol, setRol] = useState<string | null>(localStorage.getItem("rolUsuario"));

  return (
    <UserContext.Provider value={{ rol, setRol }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
