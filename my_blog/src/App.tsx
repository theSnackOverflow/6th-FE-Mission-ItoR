import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TestForToastPage from './pages/test/TestForToastPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/testForToast" element={<TestForToastPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
