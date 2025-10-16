import { BrowserRouter, Routes, Route } from 'react-router-dom';

// ? test pages 라우팅
import TestForToast from './pages/test/TestForToast';
import TestForMenu from './pages/test/TestForMenu';
import TestForDropdown from './pages/test/TestForDropdown';
import TestForModal from './pages/test/TestForModal';
import TestForText from './pages/test/TestForText';
import TestForBlank from './pages/test/TestForBlank';
import TestForDevider from './pages/test/TestForDevider';
import TestForTextField from './pages/test/TestForTextField';
import TestForProfileImage from './pages/test/TestForProfileImage';
import TestForButton from './pages/test/TestForButton';
import TestForPagination from './pages/test/TestForPagination';
import TestForHeader from './pages/test/TestForHeader';
import TestForProfileSidebar from './pages/test/TestForProfileSidebar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home</div>} />

        {/* Test Pages */}
        <Route path="/test/toast" element={<TestForToast />} />
        <Route path="/test/menu" element={<TestForMenu />} />
        <Route path="/test/dropdown-menu" element={<TestForDropdown />} />
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
