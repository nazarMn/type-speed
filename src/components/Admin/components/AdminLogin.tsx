import { useState, useEffect, useContext } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext/AuthContext'
import axios from 'axios'

interface LoginResponse {
  token: string
  user: {
    username: string
    email: string
  }
  message?: string
}

export default function AdminLogin() {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [showRemind, setShowRemind] = useState<boolean>(false)

  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) navigate('/admin') // якщо вже є токен → адмінка
  }, [navigate])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setShowRemind(false)

    try {
      const res = await axios.post<LoginResponse>('http://localhost:3000/api/admin/login', {
        email,
        password
      })

      localStorage.setItem('token', res.data.token)
      login(res.data.token, res.data.user)
      navigate('/admin')
    } catch (err: any) {
      const msg = err.response?.data?.message
      if (msg === 'Невірний email і пароль') {
        setError('Email та пароль невірний')
      } else if (msg === 'Невірний пароль') {
        setError('Невірний пароль')
        setShowRemind(true)
      } else if (msg === 'Користувача не знайдено') {
        setError('Email невірний')
      } else {
        setError('Помилка при вході')
      }
    }
  }

  return (
    <div className="w-full flex justify-center items-center h-screen bg-gradient-to-br from-blue-100 via-gray-100 to-blue-50 relative">
      <div className="w-[540px] min-h-[440px] bg-white shadow-2xl rounded-2xl flex flex-col items-center px-10 py-8">
        <h1 className="text-4xl font-extrabold mb-3 text-blue-700 tracking-wide">
          Admin Panel
        </h1>

        <h2 className="text-lg text-gray-600 mb-8">
          Увійти до адмінки
        </h2>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />

          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:border-blue-500 ${
              error === 'Невірний пароль' ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {showRemind && (
            <button
              type="button"
              className="w-full py-2 bg-red-100 text-red-700 rounded-lg font-semibold mt-2 hover:bg-red-200 transition-all cursor-pointer"
              onClick={async () => {
                try {
                  await axios.post('http://localhost:3000/api/magic-link', { email })
                  alert('Magic link надіслано на пошту')
                } catch (err: any) {
                  alert(err.response?.data?.message || 'Помилка при надсиланні посилання')
                }
              }}
            >
              Нагадати пароль
            </button>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all cursor-pointer"
          >
            Увійти
          </button>
        </form>
      </div>
    </div>
  )
}
