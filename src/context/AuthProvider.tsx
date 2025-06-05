// src/context/AuthProvider.tsx

import { useState, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import type { User } from "../types/user";
import { loginUser, registerUser } from "../lib/api/auth";

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const data = await loginUser(email, password);
      setUser(data.user);
      localStorage.setItem("authUser", JSON.stringify(data.user));

      navigate("/");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Erro inesperado no login.";
      console.error("Erro no login:", error);
      alert(message);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    if (password.length < 6) {
      alert("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    try {
      const data = await registerUser(name, email, password);
      setUser(data.user);
      localStorage.setItem("authUser", JSON.stringify(data.user));

      navigate("/login");
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Erro inesperado no registro.";
      console.error("Erro no registro:", error);
      alert(message);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
