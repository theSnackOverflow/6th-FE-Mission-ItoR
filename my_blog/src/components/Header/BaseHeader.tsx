import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import ModalWrapper from '@/components/Modal/ModalWrapper';
import LoginModal from '@/components/Modal/LoginModal';

import MenuIcon from '../../assets/icons/reorder.svg?react';
import ProfileSidebar from '../ProfileSidebar';
import { ROUTES } from '@/const/routes';

interface BaseHeaderProps {
  children?: React.ReactNode;
  offsetTop?: number;
  onLogout?: () => void;
}

const BaseHeader = ({ children, offsetTop = 0, onLogout }: BaseHeaderProps) => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, user, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        showSidebar &&
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setShowSidebar(false);
      }
    };

    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, [showSidebar]);

  // listen for global requests to open the login modal
  useEffect(() => {
    const openHandler = () => {
      if (!isAuthenticated) setShowLoginModal(true);
    };
    window.addEventListener('open-login-modal', openHandler as EventListener);
    return () =>
      window.removeEventListener(
        'open-login-modal',
        openHandler as EventListener,
      );
  }, [isAuthenticated]);

  // listen for global requests to close the login modal
  useEffect(() => {
    const closeHandler = () => setShowLoginModal(false);
    window.addEventListener('close-login-modal', closeHandler as EventListener);
    return () =>
      window.removeEventListener(
        'close-login-modal',
        closeHandler as EventListener,
      );
  }, []);

  return (
    <div className="relative">
      <nav
        className="fixed top-0 left-0 right-0 pl-3 pr-4 py-4 bg-white opacity-90 border-b border-gray-96 backdrop-blur-[2px] min-w-mobile"
        style={{ zIndex: 40, top: offsetTop }}
      >
        <div className="relative flex justify-between items-center">
          <div className="flex gap-2 justify-center items-center">
            <MenuIcon
              className="w-10 h-10 p-2 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setShowSidebar(true);
              }}
            />
            <button
              className="text-xl font-smooch font-normal"
              onClick={() => navigate(ROUTES.HOME)}
            >
              GITLOG
            </button>
          </div>

          {children}
        </div>
      </nav>

      {showSidebar && (
        <aside ref={sidebarRef} className="fixed top-0 left-0 z-50">
          <ProfileSidebar
            isLoggedIn={isAuthenticated}
            nickname={user?.nickName}
            intro={(user as { introduction?: string })?.introduction}
            profileUrl={(user as { profileUrl?: string })?.profileUrl}
            onLogout={onLogout ?? logout}
            onLogin={() => setShowLoginModal(true)}
          />
        </aside>
      )}
      {showLoginModal && (
        <ModalWrapper
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        >
          <LoginModal onClose={() => setShowLoginModal(false)} />
        </ModalWrapper>
      )}
    </div>
  );
};

export default BaseHeader;
