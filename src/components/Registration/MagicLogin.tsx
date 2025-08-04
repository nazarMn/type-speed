import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'

export default function MagicLogin() {
  const [params] = useSearchParams()
  const token = params.get('token')
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) return

    // перевірити токен та залогінити користувача
    axios.get('http://localhost:3000/api/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      localStorage.setItem('token', token!)
      alert('Вхід успішний через magic link!')
      navigate('/')
    })
    .catch(() => {
      alert('Недійсне або прострочене посилання')
    })
  }, [token])

  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl">Авторизація через magic link...</h1>
    </div>
  )
}
