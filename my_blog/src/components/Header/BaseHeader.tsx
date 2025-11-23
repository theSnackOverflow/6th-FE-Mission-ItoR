import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import MenuIcon from '../../assets/icons/reorder.svg?react';
import ProfileSidebar from '../ProfileSidebar';

interface BaseHeaderProps {
  children?: React.ReactNode;
  offsetTop?: number;
  onLogout?: () => void;
}

const BaseHeader = ({ children, offsetTop = 0, onLogout }: BaseHeaderProps) => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

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
              onClick={() => navigate('/')}
            >
              GITLOG
            </button>
          </div>

          {children}
        </div>
      </nav>

      {showSidebar && (
        <aside ref={sidebarRef} className="fixed top-0 left-0 z-50">
          <ProfileSidebar isLoggedIn={true} onLogout={onLogout} />
        </aside>
      )}
    </div>
  );
};

export default BaseHeader;
