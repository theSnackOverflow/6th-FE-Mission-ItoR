import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TestForToastPage from './pages/test/TestForToastPage';
import TestForMenu from './pages/test/TestForMenu';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home</div>} />

        {/* Test Pages */}
        <Route path="/testForToast" element={<TestForToastPage />} />
        <Route path="/menu" element={<TestForMenu />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
