import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

interface TextItem {
  _id: string;
  content: string;
  language: string;
  difficulty: 'Легкий' | 'Середній' | 'Важкий';
}

const LANGUAGES = ['Українська', 'Англійська', 'Польська'];

export const TextManager: React.FC = () => {
  const [texts, setTexts] = useState<TextItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [content, setContent] = useState('');
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [difficulty, setDifficulty] = useState<TextItem['difficulty']>('Легкий');

  // ref для автоскролу
  const listRef = useRef<HTMLDivElement | null>(null);

  // --- Завантаження текстів з бекенду
  useEffect(() => {
    axios.get('http://localhost:3000/api/texts')
      .then(res => setTexts(res.data))
      .catch(err => console.error('Помилка завантаження текстів:', err));
  }, []);

  // --- Додавання / редагування
  const handleSubmit = async () => {
    if (!content.trim()) {
      alert('Текст не може бути порожнім');
      return;
    }

    try {
      if (editingId) {
        // Оновлення
        const res = await axios.put(`http://localhost:3000/api/texts/${editingId}`, {
          content, language, difficulty,
        });
        setTexts(texts.map(t => (t._id === editingId ? res.data : t)));
        setEditingId(null);
      } else {
        // Створення
        const res = await axios.post('http://localhost:3000/api/texts', {
          content, language, difficulty,
        });
        setTexts([res.data, ...texts]);

        // автоскрол на верх (щоб новий текст видно)
        if (listRef.current) {
          listRef.current.scrollTop = 0;
        }
      }

      // Очистка форми
      setContent('');
      setLanguage(LANGUAGES[0]);
      setDifficulty('Легкий');
    } catch (err) {
      console.error('Помилка збереження:', err);
    }
  };

  // --- Редагування
  const handleEdit = (id: string) => {
    const text = texts.find(t => t._id === id);
    if (!text) return;
    setEditingId(id);
    setContent(text.content);
    setLanguage(text.language);
    setDifficulty(text.difficulty);
  };

  // --- Видалення
  const handleDelete = async (id: string) => {
    if (!window.confirm('Ви впевнені, що хочете видалити цей текст?')) return;
    try {
      await axios.delete(`http://localhost:3000/api/texts/${id}`);
      setTexts(texts.filter(t => t._id !== id));
      if (editingId === id) setEditingId(null);
    } catch (err) {
      console.error('Помилка видалення:', err);
    }
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md mt-10 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        Менеджер текстів
      </h1>

      {/* --- Форма --- */}
      <div className="mb-8">
        <textarea
          rows={4}
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Введіть текст тут..."
        />

        <div className="flex flex-col sm:flex-row sm:space-x-6 mt-4">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
          </select>

          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as any)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value="Легкий">Легкий</option>
            <option value="Середній">Середній</option>
            <option value="Важкий">Важкий</option>
          </select>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
        >
          {editingId ? 'Оновити текст' : 'Додати текст'}
        </button>

        {editingId && (
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

      {/* --- Список текстів --- */}
      <h2 className="text-2xl font-semibold mb-4">Перегляд текстів</h2>
      {texts.length === 0 ? (
        <p className="text-center text-gray-500">Тексти відсутні</p>
      ) : (
        <div
          ref={listRef}
          className="space-y-6 h-[500px] overflow-y-auto pr-2"
        >
          {texts.map(({ _id, content, language, difficulty }) => (
            <div
              key={_id}
              className="border rounded-md p-4 shadow-sm flex justify-between hover:shadow-md transition"
            >
              <div className="flex-1 whitespace-pre-wrap text-gray-800">
                {content}
              </div>
              <div className="text-sm text-gray-600 ml-4 flex flex-col justify-between min-w-[150px]">
                <p><span className="font-semibold">Мова:</span> {language}</p>
                <p><span className="font-semibold">Складність:</span> {difficulty}</p>
                <div className="flex space-x-2 mt-2">
                  <button
                    onClick={() => handleEdit(_id)}
                    className="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition"
                  >
                    Редагувати
                  </button>
                  <button
                    onClick={() => handleDelete(_id)}
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
