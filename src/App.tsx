import '@/App.css';

import { Route, Routes } from 'react-router-dom';

import AuthLayout from '@/components/layouts/AuthLayout';
import Layout from '@/components/layouts/Layout';
import MyPageLayout from '@/components/layouts/MyPageLayout';
import IdolSearchPage from '@/pages/idolSearch/IdolSearchPage';
import LandingPage from '@/pages/landing/LandingPage';
import Login from '@/pages/Login';
import MyProfile from '@/pages/MyProfile';
import MySchedule from '@/pages/MySchedule';
import Register from '@/pages/Register';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout component="landing" />}>
        <Route index element={<LandingPage />} />
      </Route>

      <Route path="/auth" element={<AuthLayout />}>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>

      <Route path="/search" element={<Layout />}>
        <Route index element={<IdolSearchPage />} />
      </Route>

      <Route path="/mypage" element={<MyPageLayout />}>
        <Route path="myprofile" element={<MyProfile />} />
        <Route path="myschedule" element={<MySchedule />} />
      </Route>
    </Routes>
  );
}

export default App;
