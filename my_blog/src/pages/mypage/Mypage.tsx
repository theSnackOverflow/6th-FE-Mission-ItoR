import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Header from '@/components/Header';
import { PostList } from '../main/components/PostList';
import ProfileSection from '@/components/ProfileSection';
import Toast from '@/components/Toast';

import ModalWrapper from '@/components/Modal/ModalWrapper';
import Modal from '@/components/Modal/Modal';

const Mypage = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const toastState = location.state?.toast;
  const [showToast, setShowToast] = useState(false);

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    if (toastState) {
      setShowToast(true);

      const timer = setTimeout(() => setShowToast(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [toastState, navigate]);

  return (
    <>
      {showToast && toastState && (
        <div className="fixed top-20 left-1/2 w-full flex  justify-center  -translate-x-1/2 z-9999">
          <Toast
            variant={toastState.variant}
            message={toastState.message}
            onClose={() => setShowToast(false)}
          />
        </div>
      )}
      <Header type="main" onLogout={() => setShowLogoutModal(true)} />
      <div className="top-[74px]">
        <ProfileSection showEdit={true} />
      </div>
      <main className="mt-3 w-full h-full flex flex-col justify-start items-center min-w-mobile mobile:overflow-x-auto">
        <PostList />
      </main>
      {showLogoutModal && (
        <ModalWrapper
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
        >
          <Modal
            title={'로그아웃을 진행할게요'}
            type="logout"
            color="auth"
            onClose={() => setShowLogoutModal(false)}
            onLogout={() => {
              setShowLogoutModal(false);
              navigate('/');
            }}
          />
        </ModalWrapper>
      )}
    </>
  );
};

export default Mypage;
