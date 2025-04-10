import { createContext, useContext, useEffect, useState } from "react";
import type { PropsWithChildren } from "react";

interface AuthProps {
  role: string;
  setRole: (role: string) => void;
}

const authContext = createContext<AuthProps | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [role, setRole] = useState(localStorage.getItem("role") || "anonymous");

  useEffect(() => {
    if (role) {
      localStorage.setItem("role", role);
    }
  }, [role]);

  return (
    <authContext.Provider value={{ role, setRole }}>
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(authContext);

  if (!context) {
    throw new Error("Le auth context doit exister");
  }

  return context;
}
