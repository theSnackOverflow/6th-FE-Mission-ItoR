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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home</div>} />

        {/* Test Pages */}
        <Route path="/toast" element={<TestForToast />} />
        <Route path="/menu" element={<TestForMenu />} />
        <Route path="/dropdownmenu" element={<TestForDropdown />} />
        <Route path="/modal" element={<TestForModal />} />
        <Route path="/text" element={<TestForText />} />
        <Route path="/blank" element={<TestForBlank />} />
        <Route path="/devider" element={<TestForDevider />} />
        <Route path="/textfield" element={<TestForTextField />} />
        <Route path="/profileimage" element={<TestForProfileImage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
