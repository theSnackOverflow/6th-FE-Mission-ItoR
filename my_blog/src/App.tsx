import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';

import { MainPage } from './pages';
import PostDetail from './pages/post/PostDetail';
import PostNew from './pages/post/PostNew';
import PostEdit from './pages/post/PostEdit';
import { Layout } from './components/Layout';

import Mypage from './pages/mypage/Mypage';
import ProfileEdit from './pages/mypage/ProfileEdit';

import SignUp from './pages/auth/SignUp';
import SignUpMain from './pages/auth/SignUpMain';
import OAuthSignUp from './pages/auth/OuAthSignUp';
import KakaoRedirect from './pages/auth/KakaoRedirect';

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/post/:postId" element={<PostDetail />} />
            <Route path="/post/:postId/edit" element={<PostEdit />} />
            <Route path="/post/new" element={<PostNew />} />

            <Route path="/mypage" element={<Mypage />} />
            <Route path="/profile/edit" element={<ProfileEdit />} />
          </Route>

          {/* Auth 관련 */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup/main" element={<SignUpMain />} />
          <Route path="/kakao-signup" element={<OAuthSignUp />} />
          <Route path="/kakao-redirect" element={<KakaoRedirect />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
