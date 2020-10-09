import React, { useState, useCallback, createContext, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface AuthState {
  token: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  signIn(credentials: SignInCredentials): void;
  signOut(): void;
  signed: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@MyUsers:token');

    if (token) {
      return { token };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(() => {
    const token = uuidv4();

    localStorage.setItem('@MyUsers:token', token);

    setData({ token });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@MyUsers:token');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ signed: !!data.token, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
