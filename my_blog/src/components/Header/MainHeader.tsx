import { useNavigate } from 'react-router-dom';

import PencleIcon from '../../assets/icons/create.svg?react';
import BaseHeader from './BaseHeader';
import { ROUTES } from '@/const/routes';

interface MainHeaderProps {
  offsetTop?: number;
  onLogout?: () => void;
}

const MainHeader = ({ offsetTop, onLogout }: MainHeaderProps) => {
  const navigate = useNavigate();

  return (
    <BaseHeader offsetTop={offsetTop} onLogout={onLogout}>
      <button
        className="w-fit h-fit px-3 py-2 flex items-center gap-1 text-gray-56"
        onClick={() => navigate(ROUTES.POST.NEW)}
      >
        <PencleIcon className="w-6 h-6" />
        <p className="text-sm font-normal">깃 로그 쓰기</p>
      </button>
    </BaseHeader>
  );
};

export default MainHeader;
