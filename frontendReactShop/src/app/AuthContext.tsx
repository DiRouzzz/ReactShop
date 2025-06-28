import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
} from 'react';

interface User {
  id: string;
  email: string;
  roleId: string;
  registeredAt: string;
}

export interface LoginResponse {
  error: null;
  user: User;
}

interface AuthContextType {
  userData: LoginResponse | null;
  setUserData: (userData: LoginResponse | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<LoginResponse | null>(null);

  const logout = () => setUserData(null);

  useLayoutEffect(() => {
    const currentUserDataJSON = sessionStorage.getItem('userData');

    if (!currentUserDataJSON) {
      return;
    }

    const currentUserData = JSON.parse(currentUserDataJSON);

    setUserData({ ...currentUserData });
  }, [setUserData]);

  return (
    <AuthContext.Provider value={{ userData, setUserData, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }
  return context;
};
