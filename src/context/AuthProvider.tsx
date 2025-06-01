// src/context/AuthContext.tsx

import { useState, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import type { User } from "../types/user";

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
      const res = await fetch("/api/auth/route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data: { user: User; message: string } = await res.json();
      if (!res.ok) throw new Error(data.message || "Falha no login.");

      setUser(data.user);
      localStorage.setItem("authUser", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Erro inesperado no login.";
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
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data: { user: User; message: string } = await res.json();
      if (!res.ok) throw new Error(data.message || "Falha no registro.");

      setUser(data.user);
      localStorage.setItem("authUser", JSON.stringify(data.user));
      navigate("/login");
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Erro inesperado no registro.";
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
