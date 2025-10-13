import { BrowserRouter, Routes, Route } from 'react-router-dom';

// ? test pages 라우팅
import TestForToastPage from './pages/test/TestForToastPage';
import TestForMenu from './pages/test/TestForMenu';
import TestForDropdown from './pages/test/TestForDropdown';
import TestForModal from './pages/test/TestForModal';
import TestForText from './pages/test/TestForText';
import TestForBlank from './pages/test/TestForBlank';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home</div>} />

        {/* Test Pages */}
        <Route path="/testForToast" element={<TestForToastPage />} />
        <Route path="/menu" element={<TestForMenu />} />
        <Route path="/dropdownmenu" element={<TestForDropdown />} />
        <Route path="/modal" element={<TestForModal />} />
        <Route path="/text" element={<TestForText />} />
        <Route path="/blank" element={<TestForBlank />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
