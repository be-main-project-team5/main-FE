import '@/App.css';

import { Route, Routes } from 'react-router-dom';

import Layout from './components/layouts/Layout';
import Chat from './pages/chat/Chat';
import LandingPage from './pages/landing/LandingPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout component="landing" />}>
        <Route index element={<LandingPage />} />
      </Route>
      <Route path="/chat" element={<Layout component="chat" />}>
        <Route index element={<Chat />} />
      </Route>
    </Routes>
  );
}

export default App;
