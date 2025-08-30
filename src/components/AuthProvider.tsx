import { createContext, useContext, useEffect, useState } from 'react';
import { firebaseService, UserAccount } from '@/services/firebaseService';

interface AuthContextType {
  user: any | null;
  userAccount: UserAccount | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: Omit<UserAccount, 'id' | 'email' | 'createdAt'>) => Promise<void>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<any | null>(null);
  const [userAccount, setUserAccount] = useState<UserAccount | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Mock auth state - Firebase disabled
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      await firebaseService.signIn(email, password);
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, userData: Omit<UserAccount, 'id' | 'email' | 'createdAt'>) => {
    try {
      await firebaseService.signUp(email, password, userData);
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseService.signOut();
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    }
  };

  const isAdmin = userAccount?.role === 'admin';

  const value: AuthContextType = {
    user,
    userAccount,
    loading,
    signIn,
    signUp,
    signOut,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
