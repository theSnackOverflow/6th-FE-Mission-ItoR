/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import axiosInstance from '@/api/axiosInstance';
import { getMyInfo } from '@/api/userAPI';
import { tokenStorage } from '@/utils/tokenStorage';
import { useAuthToken } from '@/hooks/useAuthToken';

type User = {
  nickName?: string;
  profileUrl?: string;
  introduction?: string;
  email?: string;
  name?: string;
  isSocialLogin?: boolean;
  memberId?: number | string;
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
      // fetch current user info to populate sidebar/profile
      getMyInfo()
        .then((data) => {
          const isSocial = Boolean(
            // common possibilities the backend might return
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (data as any).kakaoId ||
              (data as any).oauthProvider ||
              (data as any).provider ||
              (data as any).socialType,
          );
          setUser({
            nickName: data.nickname,
            profileUrl: data.profilePicture,
            introduction: data.introduction,
            email: data.email,
            name: data.name,
            isSocialLogin: isSocial,
            // backend may use different field names for id
            memberId:
              (data as any).memberId ??
              (data as any).id ??
              (data as any).userId,
          });
        })
        .catch((err) => {
          console.error('현재 사용자 정보 조회 실패', err);
          // token이 유효하지 않다면 로그아웃 처리
          // (선택적) 여기서는 토큰 무효화 시 자동 로그아웃을 수행하지 않습니다.
        });
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

  // listen for requests to refresh current user info (e.g., after profile picture upload)
  useEffect(() => {
    const handler = () => {
      const token = tokenStorage.getAccessToken();
      if (!token) return;
      getMyInfo()
        .then((data) => {
          const isSocial = Boolean(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (data as any).kakaoId ||
              (data as any).oauthProvider ||
              (data as any).provider ||
              (data as any).socialType,
          );
          setUser({
            nickName: data.nickname,
            profileUrl: data.profilePicture,
            introduction: data.introduction,
            email: data.email,
            name: data.name,
            isSocialLogin: isSocial,
            memberId:
              (data as any).memberId ??
              (data as any).id ??
              (data as any).userId,
          });
        })
        .catch((err) => console.error('refresh-user 처리 실패', err));
    };

    window.addEventListener('refresh-user', handler as EventListener);
    return () =>
      window.removeEventListener('refresh-user', handler as EventListener);
  }, []);

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
