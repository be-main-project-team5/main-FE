import '@/App.css';

import { Route, Routes } from 'react-router-dom';

import Layout from './components/layouts/Layout';
import LandingPage from './pages/landing/LandingPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
      </Route>
    </Routes>
  );
}

export default App;
