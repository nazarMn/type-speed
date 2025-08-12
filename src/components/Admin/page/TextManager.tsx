import React, { useState } from 'react';

interface TextItem {
  id: number;
  content: string;
  language: string;
  difficulty: 'Легкий' | 'Середній' | 'Важкий';
}

const LANGUAGES = ['Українська', 'Англійська', 'Російська', 'Іспанська', 'Німецька'];

export const TextManager: React.FC = () => {
  const [texts, setTexts] = useState<TextItem[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Поля для форми (додати / редагувати)
  const [content, setContent] = useState('');
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [difficulty, setDifficulty] = useState<TextItem['difficulty']>('Легкий');

  // Додаємо або редагуємо текст
  const handleSubmit = () => {
    if (!content.trim()) {
      alert('Текст не може бути порожнім');
      return;
    }

    if (editingId !== null) {
      // Редагування
      setTexts((prev) =>
        prev.map((t) =>
          t.id === editingId ? { ...t, content, language, difficulty } : t
        )
      );
      setEditingId(null);
    } else {
      // Додавання нового тексту
      setTexts((prev) => [
        ...prev,
        {
          id: Date.now(),
          content,
          language,
          difficulty,
        },
      ]);
    }

    // Очищаємо форму
    setContent('');
    setLanguage(LANGUAGES[0]);
    setDifficulty('Легкий');
  };

  const handleEdit = (id: number) => {
    const text = texts.find((t) => t.id === id);
    if (!text) return;
    setEditingId(id);
    setContent(text.content);
    setLanguage(text.language);
    setDifficulty(text.difficulty);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Ви впевнені, що хочете видалити цей текст?')) {
      setTexts((prev) => prev.filter((t) => t.id !== id));
      if (editingId === id) setEditingId(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        Менеджер текстів
      </h1>

      {/* Форма додавання/редагування */}
      <div className="mb-8">
        <label className="block mb-1 font-semibold text-gray-700">Текст</label>
        <textarea
          rows={4}
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Введіть текст тут..."
        />

        <div className="flex flex-col sm:flex-row sm:space-x-6 mt-4">
          <div className="flex-1 mb-4 sm:mb-0">
            <label className="block mb-1 font-semibold text-gray-700">Мова</label>
            <select
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              {LANGUAGES.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block mb-1 font-semibold text-gray-700">Складність</label>
            <select
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={difficulty}
              onChange={(e) =>
                setDifficulty(e.target.value as TextItem['difficulty'])
              }
            >
              <option value="Легкий">Легкий</option>
              <option value="Середній">Середній</option>
              <option value="Важкий">Важкий</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
        >
          {editingId !== null ? 'Оновити текст' : 'Додати текст'}
        </button>

        {editingId !== null && (
          <button
            onClick={() => {
              setEditingId(null);
              setContent('');
              setLanguage(LANGUAGES[0]);
              setDifficulty('Легкий');
            }}
            className="ml-4 mt-6 px-6 py-3 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
          >
            Відмінити
          </button>
        )}
      </div>

      {/* Список текстів */}
      <h2 className="text-2xl font-semibold mb-4">Перегляд текстів</h2>
      {texts.length === 0 ? (
        <p className="text-center text-gray-500">Тексти відсутні</p>
      ) : (
        <div className="space-y-6 max-h-[500px] overflow-y-auto">
          {texts.map(({ id, content, language, difficulty }) => (
            <div
              key={id}
              className="border rounded-md p-4 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row justify-between"
            >
              <div className="whitespace-pre-wrap text-gray-800 flex-1 mr-4">
                {content}
              </div>
              <div className="flex flex-col sm:items-end sm:justify-between space-y-2 sm:space-y-4 text-sm text-gray-600 min-w-[180px] mt-4 sm:mt-0">
                <p>
                  <span className="font-semibold">Мова:</span> {language}
                </p>
                <p>
                  <span className="font-semibold">Складність:</span> {difficulty}
                </p>

                <div className="flex space-x-3">
                  <button
                    onClick={() => handleEdit(id)}
                    className="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
                  >
                    Редагувати
                  </button>
                  <button
                    onClick={() => handleDelete(id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    Видалити
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
