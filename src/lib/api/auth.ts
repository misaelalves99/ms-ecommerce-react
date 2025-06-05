// src/lib/api/auth.ts

import type { User } from "../../types/user";

const getUsers = (): User[] => {
  const stored = localStorage.getItem("mockUsers");
  return stored ? JSON.parse(stored) : [];
};

const saveUsers = (users: User[]) => {
  localStorage.setItem("mockUsers", JSON.stringify(users));
};

export const registerUser = async (name: string, email: string, password: string): Promise<{ user: User; message: string }> => {
  return new Promise((resolve, reject) => {
    const users = getUsers();
    const exists = users.find(u => u.email === email);

    if (exists) {
      return reject(new Error("Email já cadastrado."));
    }

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      password,
    };

    users.push(newUser);
    saveUsers(users);

    resolve({ user: newUser, message: "Usuário registrado com sucesso!" });
  });
};

export const loginUser = async (email: string, password: string): Promise<{ user: User; message: string }> => {
  return new Promise((resolve, reject) => {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return reject(new Error("Email ou senha inválidos."));
    }

    resolve({ user, message: "Login realizado com sucesso!" });
  });
};
