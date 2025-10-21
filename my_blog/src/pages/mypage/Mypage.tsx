import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Header from '../../components/Header';
import { PostList } from '../main/components/PostList';
import ProfileSection from '../../components/ProfileSection';
import Toast from '../../components/Toast';

import { mockData } from '../../const/mockData';

const Mypage = () => {
  const navigate = useNavigate();

  const [posts] = useState(mockData);
  const myposts = posts.filter((post) => post.nickName === '2ssac');

  const location = useLocation();
  const toastState = location.state?.toast;
  const [showToast, setShowToast] = useState(false);

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
      <Header type="main" />
      <div style={{ top: 74 }}>
        <ProfileSection showEdit={true} />
      </div>
      <main className=" mt-3 w-full h-full flex flex-col justify-start items-center min-w-mobile mobile:overflow-x-auto">
        <PostList posts={myposts} />
      </main>
    </>
  );
};

export default Mypage;
