import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, hashPassword } from '@/lib/supabase';

interface User {
  id: number;
  login: string;
  fio?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_KEY = 'avtomaktab_session';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Validate session on mount and page refresh
  useEffect(() => {
    const validateSession = async () => {
      try {
        const sessionData = localStorage.getItem(SESSION_KEY);
        if (!sessionData) {
          setIsLoading(false);
          return;
        }

        const { userId, passwordHash } = JSON.parse(sessionData);
        
        // Verify user exists and password matches
        const { data, error } = await supabase
          .from('user2')
          .select('id, login, password')
          .eq('id', userId)
          .single();

        if (error || !data || data.password !== passwordHash) {
          // Invalid session - clear and logout
          localStorage.removeItem(SESSION_KEY);
          setUser(null);
        } else {
          setUser({ id: data.id, login: data.login });
        }
      } catch (err) {
        console.error('Session validation error:', err);
        localStorage.removeItem(SESSION_KEY);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    validateSession();
  }, []);

  const login = async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      // Hash the entered password
      const passwordHash = await hashPassword(password);

      // Query user2 table
      const { data, error } = await supabase
        .from('user2')
        .select('id, login, password')
        .eq('login', username)
        .single();

      if (error || !data) {
        return { success: false, error: 'Foydalanuvchi topilmadi' };
      }

      // Compare hashed passwords
      if (data.password !== passwordHash) {
        return { success: false, error: 'Parol noto\'g\'ri' };
      }

      // Save session
      localStorage.setItem(SESSION_KEY, JSON.stringify({
        userId: data.id,
        passwordHash: data.password
      }));

      setUser({ id: data.id, login: data.login });
      return { success: true };
    } catch (err) {
      console.error('Login error:', err);
      return { success: false, error: 'Tizim xatosi yuz berdi' };
    }
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
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
