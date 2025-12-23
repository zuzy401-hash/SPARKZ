import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, name: string) => void;
  register: (email: string, name: string) => void;
  logout: () => void;
  upgradeToDeveloper: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Simulación de persistencia básica con localStorage para esta demo
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('nexhub_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email: string, name: string) => {
    // En una app real, esto validaría contra un backend
    // Aquí simulamos que si el email contiene "dev", es un desarrollador ya verificado para propósitos de demo
    const isPreverified = email.includes('dev');
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role: isPreverified ? 'DEVELOPER' : 'USER',
      isVerified: isPreverified
    };
    setUser(newUser);
    localStorage.setItem('nexhub_user', JSON.stringify(newUser));
  };

  const register = (email: string, name: string) => {
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role: 'USER',
      isVerified: false
    };
    setUser(newUser);
    localStorage.setItem('nexhub_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('nexhub_user');
  };

  const upgradeToDeveloper = () => {
    if (user) {
      const updatedUser: User = { ...user, role: 'DEVELOPER', isVerified: true };
      setUser(updatedUser);
      localStorage.setItem('nexhub_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, upgradeToDeveloper }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
