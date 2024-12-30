import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/SiteContext';

export const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // Redireciona para a página de login se o usuário não estiver autenticado
    return <Navigate to="/login" replace />;
  }

  return children;
};

