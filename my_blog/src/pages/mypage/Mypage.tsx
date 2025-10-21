import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Header from '../../components/Header';
import { PostList } from '../main/components/PostList';
import ProfileSection from '../../components/ProfileSection';
import Toast from '../../components/Toast';

import { mockData } from '../../const/mockData';
import ModalWrapper from '../../components/Modal/ModalWrapper';
import Modal from '../../components/Modal/Modal';

const Mypage = () => {
  const navigate = useNavigate();

  const [posts] = useState(mockData);
  const myposts = posts.filter((post) => post.nickName === '2ssac');

  const location = useLocation();
  const toastState = location.state?.toast;
  const [showToast, setShowToast] = useState(false);

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    if (toastState) {
      setShowToast(true);

      navigate('/mypage', { replace: true });

      const timer = setTimeout(() => setShowToast(false));
      return () => clearTimeout(timer);
    }
  }, [toastState, navigate]);

  return (
    <>
      {showToast && toastState && (
        <div className="fixed top-20 left-1/2 w-full flex  justify-center  -translate-x-1/2 z-[9999]">
          <Toast
            variant={toastState.variant}
            message={toastState.message}
            onClose={() => setShowToast(false)}
          />
        </div>
      )}
      <Header type="main" onLogout={() => setShowLogoutModal(true)} />
      <div style={{ top: 74 }}>
        <ProfileSection showEdit={true} />
      </div>
      <main className="mt-3 w-full h-full flex flex-col justify-start items-center min-w-mobile mobile:overflow-x-auto">
        <PostList posts={myposts} />
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
              navigate('/'); // ! 구체적인 동작은 API 연결 시 Hook으로 구현
            }}
          />
        </ModalWrapper>
      )}
    </>
  );
};

export default Mypage;
