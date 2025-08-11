import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

interface Props {
  children: React.ReactElement;
}

export default function ProtectedRoute({ children }: Props) {
  const auth = useContext(AuthContext);

  if (!auth) return <Navigate to="/admin/login" replace />; // контекст не підключений

  if (!auth.token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
