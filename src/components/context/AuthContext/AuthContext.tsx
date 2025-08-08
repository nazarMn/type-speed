import { createContext, useState, useEffect } from 'react'
import axios from 'axios'

interface AuthContextType {
  user: Record<string, any> | null
  login: (token: string, userData: Record<string, any>) => void
  logout: () => void
  updateUser: (newData: Partial<Record<string, any>>) => void 
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<Record<string, any> | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      axios
        .get('http://localhost:3000/api/me', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data))
        .catch(() => setUser(null))
    }
  }, [])

  const login = (token: string, userData: Record<string, any>) => {
    localStorage.setItem('token', token)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  const updateUser = (newData: Partial<Record<string, any>>) => {
    setUser((prev) => prev ? { ...prev, ...newData } : prev)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}
