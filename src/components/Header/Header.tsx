import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

export default function Header() {
  const [user, setUser] = useState<{ username: string } | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

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

  // Закриття меню при кліку поза ним
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
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

      <div className="flex items-center gap-4 relative" ref={menuRef}>
        {user ? (
          <>
            <i
              className="fa-solid fa-user-astronaut fa-xl cursor-pointer text-[#0A335C] hover:text-[#1a4f8a] transition"
              onClick={() => setMenuOpen((prev) => !prev)}
            ></i>

            {menuOpen && (
              <div className="absolute top-10 right-0 w-44 bg-white rounded-lg shadow-lg py-2 z-50">
                <p className="px-4 py-2 text-sm text-gray-700 border-b">
                  Привіт, <b>{user.username}</b>
                </p>
                <button
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => alert('Перейти в налаштування')}
                >
                  <i className="fa-solid fa-gear mr-2"></i> Налаштування
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  <i className="fa-solid fa-right-from-bracket mr-2"></i> Вийти
                </button>
              </div>
            )}
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
