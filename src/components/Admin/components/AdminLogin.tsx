import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showRemind, setShowRemind] = useState(false);

  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (auth?.token) navigate('/admin');
  }, [auth, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setShowRemind(false);

    if (!auth) {
      setError('Auth context is not available');
      return;
    }

    try {
      await auth.login(email, password);
      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Помилка при вході');
      if (err.message?.toLowerCase().includes('пароль')) {
        setShowRemind(true);
      }
    }
  };

  const handleRemind = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Помилка надсилання посилання');
      }
      alert('Magic link надіслано на пошту');
    } catch (err: any) {
      alert(err.message || 'Помилка при надсиланні посилання');
    }
  };

  return (
    <div className="w-full flex justify-center items-center h-screen bg-gradient-to-br from-blue-100 via-gray-100 to-blue-50 relative">
      <div className="w-[540px] min-h-[440px] bg-white shadow-2xl rounded-2xl flex flex-col items-center px-10 py-8">
        <h1 className="text-4xl font-extrabold mb-3 text-blue-700 tracking-wide">Admin Panel</h1>
        <h2 className="text-lg text-gray-600 mb-8">Увійти до адмінки</h2>

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
              onClick={handleRemind}
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
  );
}
