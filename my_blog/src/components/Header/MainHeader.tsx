import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

import PencleIcon from '../../assets/icons/create.svg?react';
import BaseHeader from './BaseHeader';
import { ROUTES } from '@/const/routes';

interface MainHeaderProps {
  offsetTop?: number;
  onLogout?: () => void;
}

const MainHeader = ({ offsetTop, onLogout }: MainHeaderProps) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleWriteClick = () => {
    if (isAuthenticated) {
      navigate(ROUTES.POST.NEW);
      return;
    }

    try {
      sessionStorage.setItem('auth_redirect', ROUTES.POST.NEW);
    } catch (e) {
      /* ignore */
    }
    window.dispatchEvent(new Event('open-login-modal'));
  };

  return (
    <BaseHeader offsetTop={offsetTop} onLogout={onLogout}>
      <button
        className="w-fit h-fit px-3 py-2 flex items-center gap-1 text-gray-56"
        onClick={handleWriteClick}
      >
        <PencleIcon className="w-6 h-6" />
        <p className="text-sm font-normal">깃 로그 쓰기</p>
      </button>
    </BaseHeader>
  );
};

export default MainHeader;
