import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { useToast } from '@/context/ToastContext';

import { PostList } from './components/PostList';

const MainPage = () => {
  const { showToast } = useToast();
  const location = useLocation();
  const showSuccess = location.state?.showSuccess;

  useEffect(() => {
    if (showSuccess) {
      showToast({
        variant: 'success',
        message: '게시물이 삭제되었습니다!',
      });

      window.history.replaceState({}, document.title);
    }
  }, [location.key, showSuccess, showToast]);

  return (
    <main className="mt-16 w-full h-full flex flex-col justify-start items-center min-w-mobile mobile:overflow-x-auto">
      <PostList />
    </main>
  );
};
export default MainPage;
