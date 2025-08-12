// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// interface Leader {
//   _id: string;
//   username: string;
//   cpm: number;
//   accuracy: number;
//   errors: number;
//   date: string;
// }

// const Leaderboard: React.FC = () => {
//   const [leaders, setLeaders] = useState<Leader[]>([]);
//   const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const fetchLeaders = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get<Leader[]>('http://localhost:3000/api/leaders/today');
//       setLeaders(res.data);
//       setError('');
//     } catch (err) {
//       setError('Помилка при завантаженні лідерів');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteLeader = async (id: string) => {
//     if (!window.confirm('Ви впевнені, що хочете видалити цього лідера?')) return;
//     try {
//       await axios.delete(`http://localhost:3000/api/leaders/${id}`); // роут на бекенді має існувати
//       setLeaders((prev) => prev.filter((l) => l._id !== id));
//       if (selectedLeader?._id === id) setSelectedLeader(null);
//     } catch {
//       alert('Не вдалося видалити лідера');
//     }
//   };

//   useEffect(() => {
//     fetchLeaders();
//   }, []);

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h2 className="text-3xl font-bold mb-6">Лідери дня</h2>
//       {loading && <p>Завантаження...</p>}
//       {error && <p className="text-red-600">{error}</p>}
//       {!loading && leaders.length === 0 && <p>Немає лідерів за сьогодні.</p>}

//       <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//         {leaders.map((leader) => (
//           <div key={leader._id} className="bg-white rounded shadow p-4 relative">
//             <h3 className="text-xl font-semibold">{leader.username}</h3>
//             <p><strong>CPM:</strong> {leader.cpm}</p>
//             <p><strong>Точність:</strong> {leader.accuracy}%</p>
//             <p><strong>Помилки:</strong> {leader.errors}</p>

//             <button
//               onClick={() => setSelectedLeader(leader)}
//               className="mt-2 text-blue-600 hover:underline"
//             >
//               Детальніше
//             </button>

//             <button
//               onClick={() => deleteLeader(leader._id)}
//               className="absolute top-2 right-2 text-red-600 hover:text-red-800"
//               title="Видалити лідера"
//             >
//               ✖
//             </button>
//           </div>
//         ))}
//       </div>

//       {selectedLeader && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded p-6 w-11/12 max-w-md relative">
//             <button
//               className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 font-bold text-xl"
//               onClick={() => setSelectedLeader(null)}
//             >
//               ×
//             </button>
//             <h3 className="text-2xl font-bold mb-4">{selectedLeader.username}</h3>
//             <p><strong>CPM:</strong> {selectedLeader.cpm}</p>
//             <p><strong>Точність:</strong> {selectedLeader.accuracy}%</p>
//             <p><strong>Помилки:</strong> {selectedLeader.errors}</p>
//             <p><strong>Дата:</strong> {new Date(selectedLeader.date).toLocaleString()}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Leaderboard;
