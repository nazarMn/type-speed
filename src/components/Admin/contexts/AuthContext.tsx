// import React, { createContext, useState, useEffect } from 'react';
// import type { ReactNode } from 'react';
// import axios from 'axios';

// interface User {
//   id: string;
//   email: string;
//   username: string;
//   role?: string;
// }

// interface AuthContextType {
//   user: User | null;
//   token: string | null;
//   adminUser: User | null;
//   adminToken: string | null;
//   login: (email: string, password: string) => Promise<void>;
//   adminLogin: (email: string, password: string) => Promise<void>;
//   logout: () => void;
//   adminLogout: () => void;
//   updateUser: (newData: Partial<User>) => void;
// }

// export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));

//   const [adminUser, setAdminUser] = useState<User | null>(null);
//   const [adminToken, setAdminToken] = useState<string | null>(() => localStorage.getItem('adminToken'));

//   // Завантаження даних користувача
//   useEffect(() => {
//     if (!token) {
//       setUser(null);
//       return;
//     }
//     axios
//       .get('http://localhost:3000/api/me', {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) =>
//         setUser({
//           id: res.data.id || res.data._id || '',
//           email: res.data.email,
//           username: res.data.username,
//           role: res.data.role,
//         })
//       )
//       .catch(() => logout());
//   }, [token]);

//   // Завантаження даних адміна
//   useEffect(() => {
//     if (!adminToken) {
//       setAdminUser(null);
//       return;
//     }
//     axios
//       .get('http://localhost:3000/api/me', {
//         headers: { Authorization: `Bearer ${adminToken}` },
//       })
//       .then((res) => {
//         if (res.data.role !== 'admin') throw new Error('Відсутній доступ адміністратора');
//         setAdminUser({
//           id: res.data.id || res.data._id || '',
//           email: res.data.email,
//           username: res.data.username,
//           role: res.data.role,
//         });
//       })
//       .catch(() => adminLogout());
//   }, [adminToken]);

//   const login = async (email: string, password: string) => {
//     const res = await axios.post('http://localhost:3000/api/login', { email, password });
//     setToken(res.data.token);
//     setUser(res.data.user);
//     localStorage.setItem('token', res.data.token);
//   };

//   const adminLogin = async (email: string, password: string) => {
//     const res = await axios.post('http://localhost:3000/api/admin/login', { email, password });
//     setAdminToken(res.data.token);
//     setAdminUser(res.data.user);
//     localStorage.setItem('adminToken', res.data.token);
//   };

//   const logout = () => {
//     setToken(null);
//     setUser(null);
//     localStorage.removeItem('token');
//   };

//   const adminLogout = () => {
//     setAdminToken(null);
//     setAdminUser(null);
//     localStorage.removeItem('adminToken');
//   };

//   const updateUser = (newData: Partial<User>) => {
//     setUser((prev) => (prev ? { ...prev, ...newData } : prev));
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         token,
//         adminUser,
//         adminToken,
//         login,
//         adminLogin,
//         logout,
//         adminLogout,
//         updateUser,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
