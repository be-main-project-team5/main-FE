import '@/App.css';

import { Route, Routes } from 'react-router-dom';

import Layout from '@/components/layouts/Layout';
import MyPageLayout from '@/components/layouts/MyPageLayout';
import LandingPage from '@/pages/landing/LandingPage';
import MyProfile from '@/pages/MyProfile';
import MySchedule from '@/pages/MySchedule';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout component="landing" />}>
        <Route index element={<LandingPage />} />
      </Route>
      <Route path="/mypage" element={<MyPageLayout />}>
        <Route path="myprofile" element={<MyProfile />} />
        <Route path="myschedule" element={<MySchedule />} />
      </Route>
    </Routes>
  );
}

export default App;
