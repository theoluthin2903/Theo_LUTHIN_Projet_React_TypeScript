import React, { createContext, useContext, useEffect, useState } from "react";

export interface UserAccount {
  email: string;
  username: string;
  password: string;
}

interface AuthContextType {
  user: UserAccount | null;
  register: (email: string, username: string, password: string) => string | null;
  login: (identifier: string, password: string) => string | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_KEY = "cinescope_users";
const CURRENT_USER_KEY = "cinescope_current_user";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserAccount | null>(() => {
    const saved = localStorage.getItem(CURRENT_USER_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  }, [user]);

  const getUsers = (): UserAccount[] => {
    const saved = localStorage.getItem(USERS_KEY);
    return saved ? JSON.parse(saved) : [];
  };

  const register = (email: string, username: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedUsername = username.trim();

    if (!normalizedEmail || !normalizedUsername || !password) {
      return "Tous les champs sont obligatoires.";
    }

    const users = getUsers();

    if (users.some((item) => item.email.toLowerCase() === normalizedEmail)) {
      return "Cette adresse e-mail est déjà utilisée.";
    }

    if (users.some((item) => item.username.toLowerCase() === normalizedUsername.toLowerCase())) {
      return "Ce pseudonyme est déjà utilisé.";
    }

    const newUser = {
      email: normalizedEmail,
      username: normalizedUsername,
      password,
    };

    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));

    return null;
  };

  const login = (identifier: string, password: string) => {
    const value = identifier.trim().toLowerCase();
    const users = getUsers();

    const foundUser = users.find(
      (item) =>
        (item.email.toLowerCase() === value ||
          item.username.toLowerCase() === value) &&
        item.password === password
    );

    if (!foundUser) {
      return "E-mail/pseudo ou mot de passe incorrect.";
    }

    setUser(foundUser);
    return null;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth doit être utilisé au sein de AuthProvider");
  }

  return context;
};
