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
} from './pages/test/index';

import { MainPage } from './pages';
import PostDetail from './pages/post/PostDetail';
import PostNew from './pages/post/PostNew';
// import { Layout } from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route element={<Layout />}> */}
        <Route path="/" element={<MainPage />} />
        <Route path="/post/:postId" element={<PostDetail />} />
        <Route path="/post/new" element={<PostNew />} />
        {/* </Route> */}

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
