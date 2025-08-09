import { useEffect, useContext } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext/AuthContext'

export default function MagicLogin() {
  const [params] = useSearchParams()
  const token = params.get('token')
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  useEffect(() => {
    if (!token) return

    axios
      .get('https://type-speed-server.onrender.com/api/me', {
        headers: {
          Authorization: `Bearer ${token}`,  // Тут має бути Authorization, не просто token
        },
      })
      .then(res => {
        localStorage.setItem('token', token)
        login(token, res.data)
        alert('Вхід успішний через magic link!')
        navigate('/')
      })
      .catch(() => {
        alert('Недійсне або прострочене посилання')
      })
  }, [token, login, navigate])

  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl">Авторизація через magic link...</h1>
    </div>
  )
}
