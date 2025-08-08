import React from "react";

interface Leader {
  id: number;
  username: string;
  cpm: number;
  accuracy: number;
  errors: number;
}

const leaders: Leader[] = [
  { id: 1, username: "Miksnis", cpm: 85, accuracy: 98.5, errors: 2 },
  { id: 2, username: "TypistPro", cpm: 78, accuracy: 97.8, errors: 3 },
  { id: 3, username: "FastFingers", cpm: 74, accuracy: 96.9, errors: 4 },
  { id: 4, username: "QuickTypist", cpm: 69, accuracy: 95.4, errors: 6 },
  { id: 5, username: "Speedy", cpm: 64, accuracy: 94.8, errors: 7 },
];

export const Leaderboard: React.FC = () => {
  return (
    <section className="max-w-3xl mx-auto p-6 font-sans text-gray-900">
      <h1 className="text-3xl font-light text-center mb-6">Топ лідери за швидкістю друку сьогодні</h1>
      <p className="text-center text-gray-500 mb-8 text-sm">8 серпня 2025</p>

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="pb-3 text-left w-14 font-light text-gray-500">Місце</th>
            <th className="pb-3 text-left font-light text-gray-500">Користувач</th>
           <th className="pb-3 text-center font-light text-gray-500 w-24">CPM</th>
            <th className="pb-3 text-center font-light text-gray-500 w-24">Точність</th>
            <th className="pb-3 text-center font-light text-gray-500 w-24">Помилки</th>
          </tr>
        </thead>
        <tbody >
          {leaders.map((user, idx) => (
            <tr
              key={user.id}
              className="border-b ro border-gray-200 hover:bg-gray-50 transition-colors cursor-default к"
            >
              <td className="py-4 pr-6 text-center">
                <span
                  className={`inline-block w-8 h-8 rounded-full text-white font-semibold flex items-center justify-center pt-0.5 ${
                    idx === 0
                      ? "bg-yellow-400"
                      : idx === 1
                      ? "bg-gray-400"
                      : idx === 2
                      ? "bg-orange-400"
                      : "bg-gray-300"
                  }`}
                >
                  {idx + 1}
                </span>
              </td>
              <td className="py-4 font-medium cursor-pointer">
                <p>{user.username}</p>
              </td>
              <td className="py-4 text-center font-mono">{user.cpm}</td>
              <td className="py-4 text-center font-mono">{user.accuracy.toFixed(1)}%</td>
              <td className="py-4 text-center font-mono">{user.errors}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-10 max-w-md mx-auto text-center text-gray-600 text-xs font-light space-y-1">
  <p>
    <strong>CPM</strong> — кількість символів за хвилину.
  </p>
  <p>
    <strong>Точність</strong> — відсоток правильних натискань клавіш.
  </p>
  <p>
    <strong>Помилки</strong> — кількість неправильних натискань.
  </p>
</div>

    </section>
  );
};
