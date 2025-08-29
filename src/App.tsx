import './App.css'
import TextList from './components/TextList/TextList'
import Header from './components/Header/Header'
import Registration from './components/Registration/Registration'
import MagicLogin from './components/Registration/MagicLogin'
import { MyStats } from './components/MyStats/MyStats'
import { Leaderboard } from './components/LeaderBoard/LeaderBoard'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import AdminLayout from './components/Admin/components/Layout'
import AdminLogin from './components/Admin/components/AdminLogin'
import AdminProtectedRoute from './components/Admin/components/ProtectedRoute'
import { TextManager } from './components/Admin/page/TextManager'
import LeaderboardAdmin from './components/Admin/page/Leaderboard'

function App() {
  return (
    <Router>
      <div className="w-full h-screen flex flex-col items-center justify-start bg-gray-100">
        <Routes>
          {/* Користувацька частина */}
          <Route
            path="/"
            element={
              <div className="w-full h-full pt-[20px]">
                <Header />
                <TextList />
              </div>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <div className="w-full h-full pt-[20px]">
                <Header />
                <Leaderboard />
              </div>
            }
          />
          <Route
            path="/my-stats"
            element={
              <div className="w-full h-full pt-[20px]">
                <Header />
                <MyStats />
              </div>
            }
          />
          <Route path="/registration" element={<Registration />} />
          <Route path="/magic-login" element={<MagicLogin />} />

          {/* --- Адмінська частина --- */}
        
          <Route
            path="/admin"
            element={
            
                <AdminLayout />
           
            }
          >
            <Route index element={<h1 className="text-3xl">Головна адмінки</h1>} />
            <Route path="texts" element={<TextManager />} />
            <Route path="leaders" element={<LeaderboardAdmin />} />
            <Route path="users" element={<h1>Користувачі</h1>} />
            <Route path="settings" element={<h1>Налаштування</h1>} />
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
