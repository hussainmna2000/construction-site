import React, { createContext, useContext, useState, useEffect } from 'react';

type Role = 'MD' | 'Staff' | null;

interface AuthContextType {
  user: { name: string; role: Role; email: string } | null;
  login: (name: string, role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ name: string; role: Role; email: string } | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('construction_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (name: string, role: Role) => {
    const email = `${name.toLowerCase().replace(/\s+/g, '.')}@mnasmart.com`;
    const newUser = { name, role, email };
    setUser(newUser);
    localStorage.setItem('construction_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('construction_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
