import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Header from '../../components/Header';
import Toast from '../../components/Toast';

import { PostList } from './components/PostList';

const MainPage = () => {
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
      {showToast && (
        <div className="fixed top-20 left-1/2 w-full flex  justify-center  -translate-x-1/2 z-[9999]">
          <Toast
            variant="success"
            message="게시물이 삭제되었습니다!"
            onClose={() => setShowToast(false)}
          />
        </div>
      )}
      <Header type="main" />
      <main className="mt-16 w-full h-full flex flex-col justify-start items-center min-w-mobile mobile:overflow-x-auto">
        <PostList />
      </main>
    </>
  );
};
export default MainPage;
