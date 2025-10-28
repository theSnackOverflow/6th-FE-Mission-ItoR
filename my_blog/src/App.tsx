import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
// import { Layout } from './components/Layout';

import Mypage from './pages/mypage/Mypage';
import ProfileEdit from './pages/mypage/ProfileEdit';

import SignUp from './pages/auth/SignUp';
import SignUpMain from './pages/auth/SignUpMain';

function App() {
  return (
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
  );
}

export default App;
