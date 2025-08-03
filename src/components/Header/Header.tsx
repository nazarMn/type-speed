import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Header() {
  const [user, setUser] = useState<{ username: string } | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      axios
        .get('http://localhost:3000/api/me', {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => setUser(res.data))
        .catch(() => setUser(null))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
    window.location.href = '/'
  }

  return (
    <header className="w-full h-[50px]  flex items-center justify-between px-10">
      <div className="flex items-center">
        <h1
          className="text-2xl font-extrabold cursor-pointer hover:text-[#1a4f8a] transition"
          onClick={() => (window.location.href = '/')}
        >
          TypeSpeed
        </h1>
      </div>

      <nav className="flex items-center gap-18">
        <h2 className="text-2xl font-bold cursor-pointer hover:text-[#1a4f8a] transition">
          Тестування
        </h2>
        <h2 className="text-2xl font-bold cursor-pointer hover:text-[#1a4f8a] transition">
          Лідери
        </h2>
        <h2 className="text-2xl font-bold cursor-pointer hover:text-[#1a4f8a] transition">
          Історія
        </h2>
      </nav>

      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="font-semibold text-[#0A335C]">
              Привіт, {user.username}
            </span>
            <button
              className="cursor-pointer text-lg font-semibold text-white bg-red-600 px-5 py-2 rounded-xl hover:bg-red-700 transition"
              onClick={handleLogout}
            >
              Вийти
            </button>
          </>
        ) : (
          <>
            <button
              className="cursor-pointer text-lg font-semibold text-white bg-[#0A335C] px-5 py-2 rounded-xl hover:bg-[#1a4f8a] transition"
              onClick={() => (window.location.href = '/registration')}
            >
              Вхід
            </button>
            <i
              className="fa-solid fa-user-astronaut fa-xl cursor-pointer text-[#0A335C] hover:text-[#1a4f8a] transition"
              onClick={() => (window.location.href = '/registration')}
            ></i>
          </>
        )}
      </div>
    </header>
  )
}
