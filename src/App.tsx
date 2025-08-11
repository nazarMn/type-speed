import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider } from './components/Admin/contexts/AuthContext';
import AdminLogin from './components/Admin/components/AdminLogin';
import ProtectedRoute from './components/Admin/components/ProtectedRoute';
import Sidebar from './components/Admin/components/Sidebar';

function AdminHome() {
  return <div className="p-6">Адмінка — головна сторінка</div>;
}

import TextList from './components/TextList/TextList';
import Header from './components/Header/Header';
import Registration from './components/Registration/Registration';
import MagicLogin from './components/Registration/MagicLogin';
import { MyStats } from './components/MyStats/MyStats';
import { Leaderboard } from './components/LeaderBoard/LeaderBoard';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <div className="flex min-h-screen">
                  <Sidebar />
                  <div className="flex-1 p-4">
                    <Routes>
                      <Route path="" element={<AdminHome />} />
                      {/* Додаткові сторінки адміна */}
                      {/* <Route path="users" element={<Users />} /> */}
                      {/* <Route path="texts" element={<Texts />} /> */}
                      {/* <Route path="leaders" element={<Leaders />} /> */}
                    </Routes>
                  </div>
                </div>
              </ProtectedRoute>
            }
          />

          <Route
            path="/"
            element={
              <div className="w-full h-screen flex flex-col items-center justify-start bg-gray-100 pt-[20px]">
                <Header />
                <TextList />
              </div>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <div className="w-full h-screen flex flex-col items-center justify-start bg-gray-100 pt-[20px]">
                <Header />
                <Leaderboard />
              </div>
            }
          />
          <Route
            path="/my-stats"
            element={
              <div className="w-full h-screen flex flex-col items-center justify-start bg-gray-100 pt-[20px]">
                <Header />
                <MyStats />
              </div>
            }
          />
          <Route path="/registration" element={<Registration />} />
          <Route path="/magic-login" element={<MagicLogin />} />


          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
