import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Leader {
  _id: string;
  username: string;
  cpm: number;
  accuracy: number;
  errors: number;
  date: string;
}

const Leaderboard: React.FC = () => {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchLeaders = async () => {
    setLoading(true);
    try {
      const res = await axios.get<Leader[]>('http://localhost:3000/api/leaders/today');
      setLeaders(res.data);
      setError('');
    } catch {
      setError('Помилка при завантаженні лідерів');
    } finally {
      setLoading(false);
    }
  };

  const deleteLeader = async (id: string) => {
    if (!window.confirm('Ви впевнені, що хочете видалити цього лідера?')) return;
    try {
      await axios.delete(`http://localhost:3000/api/leaders/${id}`);
      setLeaders((prev) => prev.filter((l) => l._id !== id));
      if (selectedLeader?._id === id) setSelectedLeader(null);
    } catch {
      alert('Не вдалося видалити лідера');
    }
  };

  useEffect(() => {
    fetchLeaders();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-10 px-6 sm:px-12 md:px-24 font-sans text-gray-900">
      <h1 className="text-5xl font-extrabold mb-10 text-center tracking-wide text-indigo-700">
        Лідери дня
      </h1>

      {loading && <p className="text-center text-gray-500">Завантаження...</p>}
      {error && <p className="text-center text-red-600 mb-6">{error}</p>}
      {!loading && leaders.length === 0 && (
        <p className="text-center text-gray-500">Немає лідерів за сьогодні.</p>
      )}

      {leaders.length > 0 && (
        <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200 bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-indigo-100">
              <tr>
                <th className="text-left px-6 py-3 font-semibold text-indigo-900">Ім'я</th>
                <th className="text-center px-6 py-3 font-semibold text-indigo-900">CPM</th>
                <th className="text-center px-6 py-3 font-semibold text-indigo-900">Точність (%)</th>
                <th className="text-center px-6 py-3 font-semibold text-indigo-900">Помилки</th>
                <th className="text-center px-6 py-3 font-semibold text-indigo-900">Дата</th>
                <th className="text-center px-6 py-3 font-semibold text-indigo-900">Дії</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leaders.map((leader) => (
                <tr
                  key={leader._id}
                  className="hover:bg-indigo-50 transition-colors cursor-default"
                >
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{leader.username}</td>
                  <td className="text-center px-6 py-4 whitespace-nowrap">{leader.cpm}</td>
                  <td className="text-center px-6 py-4 whitespace-nowrap">{leader.accuracy}%</td>
                  <td className="text-center px-6 py-4 whitespace-nowrap">{leader.errors}</td>
                  <td className="text-center px-6 py-4 whitespace-nowrap">
                    {new Date(leader.date).toLocaleDateString()}
                  </td>
                  <td className="text-center px-6 py-4 whitespace-nowrap space-x-3">
                    {/* <button
                      onClick={() => setSelectedLeader(leader)}
                      className="text-indigo-600 hover:text-indigo-800 font-semibold focus:outline-none transition"
                      aria-label={`Детальніше про ${leader.username}`}
                    >
                      Детальніше
                    </button> */}
                    <button
                      onClick={() => deleteLeader(leader._id)}
                      className="inline-flex items-center gap-1 text-red-600 hover:text-red-800 font-semibold focus:outline-none transition transform hover:scale-110"
                      aria-label={`Видалити лідера ${leader.username}`}
                      title="Видалити лідера"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4" />
                      </svg>
                      Видалити
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedLeader && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedLeader(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className="bg-white rounded-lg max-w-md w-full p-8 shadow-xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-3xl font-bold focus:outline-none"
              onClick={() => setSelectedLeader(null)}
              aria-label="Закрити деталі"
            >
              ×
            </button>
            <h3 id="modal-title" className="text-3xl font-extrabold mb-6 text-indigo-700">
              {selectedLeader.username}
            </h3>
            <div className="text-gray-800 space-y-4 text-lg">
              <p><strong>CPM:</strong> {selectedLeader.cpm}</p>
              <p><strong>Точність:</strong> {selectedLeader.accuracy}%</p>
              <p><strong>Помилки:</strong> {selectedLeader.errors}</p>
              <p><strong>Дата:</strong> {new Date(selectedLeader.date).toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
