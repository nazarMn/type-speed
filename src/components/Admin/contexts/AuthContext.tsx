import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));

  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/me', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const text = await res.text();

        if (!res.ok) {
          // Якщо є текст - парсимо, інакше кидаємо помилку з статусом
          let errMsg = `Помилка ${res.status}`;
          if (text) {
            try {
              const errData = JSON.parse(text);
              errMsg = errData.message || errMsg;
            } catch {
              // ignore JSON parse error
            }
          }
          throw new Error(errMsg);
        }

        if (!text) throw new Error('Порожня відповідь сервера');

        const data = JSON.parse(text);

        setUser({
          id: data.id || data._id || '',
          email: data.email,
          username: data.username,
        });

      } catch (error) {
        logout();
      }
    };

    fetchUser();
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch('http://localhost:3000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const text = await res.text();

      if (!res.ok) {
        let errMsg = `Помилка ${res.status}`;
        if (text) {
          try {
            const errData = JSON.parse(text);
            errMsg = errData.message || errMsg;
          } catch {
            // ignore
          }
        }
        throw new Error(errMsg);
      }

      if (!text) throw new Error('Порожня відповідь сервера');

      const data = JSON.parse(text);

      const t = data.token;
      const u = data.user;

      setToken(t);
      setUser(u);
      localStorage.setItem('token', t);

    } catch (error: any) {
      throw new Error(error.message || 'Login failed');
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
