import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TestForToastPage from './pages/test/TestForToastPage';
import TestForMenu from './pages/test/TestForMenu';
import TestForDropdown from './pages/test/TestForDropdown';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home</div>} />

        {/* Test Pages */}
        <Route path="/testForToast" element={<TestForToastPage />} />
        <Route path="/menu" element={<TestForMenu />} />
        <Route path="/dropdownmenu" element={<TestForDropdown />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
