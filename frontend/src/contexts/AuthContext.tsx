import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface User {
  nombres: string;
  apellidos: string;
  email: string;
  foto: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Función para actualizar desde localStorage
  const updateAuthFromStorage = useCallback(() => {
    console.log('🔍 AuthProvider: Actualizando desde localStorage');
    const userData = localStorage.getItem('usuario');
    
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
        console.log('🔍 AuthProvider: Usuario autenticado:', parsedUser.nombres);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('usuario');
      }
    } else {
      setUser(null);
      setIsAuthenticated(false);
      console.log('🔍 AuthProvider: No hay usuario en localStorage');
    }
  }, []);

  useEffect(() => {
    // Cargar estado inicial
    updateAuthFromStorage();
    setLoading(false);

    // Escuchar cambios en localStorage (para sincronizar entre pestañas)
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'usuario') {
        console.log('🔍 AuthProvider: localStorage cambió, actualizando...');
        updateAuthFromStorage();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // También verificar periódicamente (por si acaso)
    const interval = setInterval(() => {
      updateAuthFromStorage();
    }, 1000); // Verificar cada segundo

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [updateAuthFromStorage]);

  const login = (userData: User) => {
    console.log('🔍 AuthProvider: login llamado con:', userData);
    localStorage.setItem('usuario', JSON.stringify(userData));
    // Forzar actualización inmediata
    updateAuthFromStorage();
    
    // Disparar un evento personalizado para notificar a otros componentes
    window.dispatchEvent(new Event('auth-change'));
  };

  const logout = () => {
    console.log('🔍 AuthProvider: logout llamado');
    localStorage.removeItem('usuario');
    // Forzar actualización inmediata
    updateAuthFromStorage();
    
    // Disparar un evento personalizado para notificar a otros componentes
    window.dispatchEvent(new Event('auth-change'));
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};