import '@/App.css';

import { Route, Routes } from 'react-router-dom';

import AuthLayout from '@/components/layouts/AuthLayout';
import Layout from '@/components/layouts/Layout';
import MyPageLayout from '@/components/layouts/MyPageLayout';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import IdolSearchPage from '@/pages/idolSearch/IdolSearchPage';
import LandingPage from '@/pages/landing/LandingPage';
import Login from '@/pages/Login';
import FanMainPage from '@/pages/main/fan/FanMainPage';
import MyProfile from '@/pages/MyProfile';
import MySchedule from '@/pages/MySchedule';
import Register from '@/pages/Register';

import Chat from './pages/chat/Chat';

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

      <Route path="/idols" element={<Layout />}>
        <Route path=":idolId" element={<FanMainPage />} />
      </Route>

      <Route path="/mypage" element={<MyPageLayout />}>
        <Route path="myprofile" element={<MyProfile />} />
        <Route path="myschedule" element={<MySchedule />} />
      </Route>

      <Route path="/admin" element={<Layout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
      </Route>
      <Route path="/chat" element={<Layout component="chat" />}>
        <Route index element={<Chat />} />
      </Route>
    </Routes>
  );
}

export default App;
