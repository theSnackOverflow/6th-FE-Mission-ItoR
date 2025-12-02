/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import axiosInstance from '@/api/axiosInstance';
import { tokenStorage } from '@/utils/tokenStorage';
import { useAuthToken } from '@/hooks/useAuthToken';

type User = {
  nickName?: string;
  profileUrl?: string;
  intro?: string;
} | null;

type AuthContextValue = {
  isAuthenticated: boolean;
  user: User;
  login: (accessToken: string, refreshToken: string, user?: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    () => !!tokenStorage.getAccessToken(),
  );
  const [user, setUser] = useState<User>(null);

  useAuthToken();

  useEffect(() => {
    const token = tokenStorage.getAccessToken();
    if (token) {
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const login = (
    accessToken: string,
    refreshToken: string,
    userInfo?: User,
  ) => {
    tokenStorage.setTokens(accessToken, refreshToken);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    setIsAuthenticated(true);
    if (userInfo) setUser(userInfo);
  };

  const logout = () => {
    tokenStorage.clearTokens();
    // remove header
    if (axiosInstance.defaults.headers.common) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      delete axiosInstance.defaults.headers.common.Authorization;
    }
    setIsAuthenticated(false);
    setUser(null);
    // optional: redirect to home
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export default AuthContext;
