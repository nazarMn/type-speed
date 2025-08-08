import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";

interface TestResult {
  cpm: number;
  accuracy: number;
  errors: number;
  date: string | Date;
}

export const MyStats: React.FC = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <section className="max-w-3xl mx-auto p-6 font-sans text-gray-900 text-center">
        <h2 className="text-2xl font-semibold mb-4">Особиста статистика</h2>
        <p className="text-gray-600 text-lg">
          Зайдіть в акаунт, щоб ця функція була доступна.
        </p>
      </section>
    );
  }

  const {
    averageCPM,
    averageAccuracy,
    averageErrors,
    totalTests,
    testHistory = [],
  } = user;

  const tests: TestResult[] = testHistory;

  return (
    <section className="max-w-3xl mx-auto p-6 font-sans text-gray-900">
      <h1 className="text-3xl font-light text-center mb-6">
        Особиста статистика
      </h1>

      <table className="w-full border-collapse border border-gray-300 mb-10">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left font-light text-gray-600">Показник</th>
            <th className="py-2 px-4 text-center font-light text-gray-600">
              Значення (з {totalTests} тестів)
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-gray-300 hover:bg-gray-50">
            <td className="py-3 px-4 font-medium">CPM (символів за хвилину)</td>
            <td className="py-3 px-4 text-center font-mono">
  {(averageCPM ?? 0).toFixed(1)}
</td>

          </tr>
          <tr className="border-t border-gray-300 hover:bg-gray-50">
            <td className="py-3 px-4 font-medium">Точність</td>
            <td className="py-3 px-4 text-center font-mono">
              {(averageAccuracy ?? 0).toFixed(1)}%
            </td>
          </tr>
          <tr className="border-t border-gray-300 hover:bg-gray-50">
            <td className="py-3 px-4 font-medium">Помилки</td>
            <td className="py-3 px-4 text-center font-mono">
              {(averageErrors ?? 0).toFixed(1)}
            </td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-2xl font-semibold mb-4 text-center">
        Останні результати тестів
      </h2>
      {tests.length === 0 ? (
        <p className="text-center text-gray-600">Історія тестів відсутня.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 font-light text-left">Дата</th>
              <th className="py-2 px-4 font-light text-center w-24">CPM</th>
              <th className="py-2 px-4 font-light text-center w-24">Точність</th>
              <th className="py-2 px-4 font-light text-center w-24">Помилки</th>
            </tr>
          </thead>
          <tbody>
            {tests.map((test: TestResult, i: number) => (
              <tr
                key={i}
                className="border-t border-gray-300 hover:bg-gray-50"
              >
                <td className="py-3 px-4 font-mono">
                  {new Date(test.date).toLocaleDateString("uk-UA", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="py-3 px-4 text-center font-mono">{test.cpm}</td>
                <td className="py-3 px-4 text-center font-mono">
                  {test.accuracy.toFixed(1)}%
                </td>
                <td className="py-3 px-4 text-center font-mono">{test.errors}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};
