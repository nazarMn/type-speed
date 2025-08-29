import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

interface Props {
  children: React.ReactElement;
}

export default function AdminProtectedRoute({ children }: Props) {
  const auth = useContext(AuthContext);

  if (!auth?.adminToken) {
    return <Navigate to="/admin/login" replace />;
  }
  if (!auth.token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
