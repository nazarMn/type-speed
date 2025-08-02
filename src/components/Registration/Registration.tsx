import React, { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Registration() {
  const [isRegister, setIsRegister] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    if (isRegister) {
      if (password !== confirmPassword) {
        return setError('Паролі не співпадають!')
      }

      try {
        const res = await axios.post('http://localhost:3000/api/register', {
          email,
          username,
          password
        })

        alert(res.data.message)
        localStorage.setItem('token', res.data.token)
        navigate('/')
      } catch (err: any) {
        setError(err.response?.data?.message || 'Помилка при реєстрації')
      }
    } else {
      alert('Функція входу ще не реалізована')
    }
  }

  return (
    <div className="w-full flex justify-center items-center h-screen bg-gradient-to-br from-blue-100 via-gray-100 to-blue-50 relative">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 right-6 text-gray-500 hover:text-gray-800 transition text-3xl font-bold cursor-pointer"
      >
        &times;
      </button>

      <div className="w-[540px] min-h-[440px] bg-white shadow-2xl rounded-2xl flex flex-col items-center px-10 py-8">
        <h1 className="text-4xl font-extrabold mb-3 text-blue-700 tracking-wide">
          TypeSpeed
        </h1>

        <h2 className="text-lg text-gray-600 mb-8">
          {isRegister ? 'Реєстрація нового акаунта' : 'Увійти в акаунт'}
        </h2>

        {!isRegister && (
          <>
            <button className="w-full flex items-center justify-center gap-3 py-3 px-5 bg-white border border-gray-300 rounded-lg hover:shadow-md transition-all duration-200">
              <img
                className="w-6 h-6"
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google Icon"
              />
              <span className="text-gray-700 font-medium">Продовжити з Google</span>
            </button>

            <div className="w-full flex items-center my-6">
              <span className="flex-grow h-px bg-gray-300"></span>
              <span className="px-3 text-gray-400 text-sm">або</span>
              <span className="flex-grow h-px bg-gray-300"></span>
            </div>
          </>
        )}

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />

          {isRegister && (
            <input
              type="text"
              placeholder="Ім'я користувача"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          )}

          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />

          {isRegister && (
            <input
              type="password"
              placeholder="Підтвердження пароля"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all cursor-pointer"
          >
            {isRegister ? 'Зареєструватися' : 'Увійти'}
          </button>
        </form>

        <p className="text-gray-500 text-sm mt-5">
          {isRegister ? (
            <>
              Вже маєте акаунт?{' '}
              <span
                onClick={() => setIsRegister(false)}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Увійти
              </span>
            </>
          ) : (
            <>
              Ще не маєте акаунта?{' '}
              <span
                onClick={() => setIsRegister(true)}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                Зареєструватися
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  )
}
