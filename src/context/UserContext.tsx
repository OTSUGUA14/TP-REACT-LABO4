// UserContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface UserContextType {
  rol: string | null;
  setRol: (rol: string | null) => void;
  logout: () => void; // ✅ agregado
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: UserProviderProps) => {
  const [rol, setRol] = useState<string | null>(localStorage.getItem("rolUsuario"));
  const navigate = useNavigate();

  const logout = () => {
    setRol(null);
    localStorage.removeItem("rolUsuario");
    navigate("/login");
  };

  return (
    <UserContext.Provider value={{ rol, setRol, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
