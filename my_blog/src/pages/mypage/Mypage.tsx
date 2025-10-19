import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Header from '../../components/Header';

import { PostList } from '../main/components/PostList';
import Toast from '../../components/Toast';
import ProfileSection from '../../components/ProfileSection';

const Mypage = () => {
  const [showToast, setShowToast] = useState(false);
  const location = useLocation();
  const showSuccess = location.state?.showSuccess;

  useEffect(() => {
    if (showSuccess) {
      setShowToast(true);

      window.history.replaceState({}, document.title);

      const timer = setTimeout(() => setShowToast(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [location.key, showSuccess]);

  return (
    <>
      <Header type="main" />
      <div style={{ top: 74 }}>
        <ProfileSection />
      </div>
      <main className="mt-3 -full h-full flex flex-col justify-start items-center min-w-mobile mobile:overflow-x-auto">
        <PostList />
      </main>
    </>
  );
};

export default Mypage;
