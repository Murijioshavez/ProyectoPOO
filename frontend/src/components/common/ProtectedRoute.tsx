import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  console.log('🔍 ProtectedRoute: isAuthenticated:', isAuthenticated, 'loading:', loading);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#006DFF]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('🔍 ProtectedRoute: Redirigiendo a /login');
    return <Navigate to="/login" replace />;
  }

  console.log('🔍 ProtectedRoute: Permitiendo acceso');
  return children;
};

export default ProtectedRoute;