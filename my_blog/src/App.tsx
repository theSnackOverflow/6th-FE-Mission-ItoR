import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import axiosInstance from './api/axiosInstance';
import { ToastProvider } from './context/ToastContext';
import {
  TestForBlank,
  TestForButton,
  TestForDevider,
  TestForDropdown,
  TestForHeader,
  TestForMenu,
  TestForModal,
  TestForPagination,
  TestForProfileImage,
  TestForProfileSidebar,
  TestForText,
  TestForTextField,
  TestForToast,
  TestForModalWrapper,
  TestForLoginModal,
} from './pages/test/index';

import { MainPage } from './pages';
import PostDetail from './pages/post/PostDetail';
import PostNew from './pages/post/PostNew';
// import { Layout } from './components/Layout'; //! 추후 수정하겠습니다ㅠ

import Mypage from './pages/mypage/Mypage';
import ProfileEdit from './pages/mypage/ProfileEdit';

import SignUp from './pages/auth/SignUp';
import SignUpMain from './pages/auth/SignUpMain';
import OAuthSignUp from './pages/auth/OAthSignUp';
import KakaoRedirect from './pages/auth/KakaoRedirect';

function App() {
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (token) {
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else if (refreshToken) {
      const refreshAccessToken = async () => {
        try {
          const res = await axiosInstance.post('/auth/reissue', {
            refreshToken,
          });
          const newToken = res.data.data.accessToken;
          localStorage.setItem('accessToken', newToken);
          axiosInstance.defaults.headers.common.Authorization = `Bearer ${newToken}`;
        } catch (err) {
          console.error('토큰 갱신 실패:', err);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/';
        }
      };
      refreshAccessToken();
    }
  }, []);
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          {/* <Route element={<Layout />}> */}
          <Route path="/" element={<MainPage />} />
          <Route path="/post/:postId" element={<PostDetail />} />
          <Route path="/post/new" element={<PostNew />} />

          {/* 마이페이지 관련 */}
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />

          {/* Auth 관련 */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup/main" element={<SignUpMain />} />
          <Route path="/kakao-signup" element={<OAuthSignUp />} />
          <Route path="/kakao-redirect" element={<KakaoRedirect />} />

          {/* Test Pages */}
          <Route path="/test/toast" element={<TestForToast />} />
          <Route path="/test/menu" element={<TestForMenu />} />
          <Route path="/test/dropdown" element={<TestForDropdown />} />
          <Route path="/test/modal" element={<TestForModal />} />
          <Route path="/test/text" element={<TestForText />} />
          <Route path="/test/blank" element={<TestForBlank />} />
          <Route path="/test/devider" element={<TestForDevider />} />
          <Route path="/test/text-field" element={<TestForTextField />} />
          <Route path="/test/profile-image" element={<TestForProfileImage />} />
          <Route path="/test/button" element={<TestForButton />} />
          <Route path="/test/pagination" element={<TestForPagination />} />
          <Route path="/test/header" element={<TestForHeader />} />
          <Route
            path="/test/profile-sidebar"
            element={<TestForProfileSidebar />}
          />
          <Route path="/test/modal-wrapper" element={<TestForModalWrapper />} />
          <Route path="/test/login-modal" element={<TestForLoginModal />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
