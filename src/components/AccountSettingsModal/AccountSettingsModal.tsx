import React, { useState, useEffect, useContext } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from '../context/AuthContext/AuthContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AccountSettingsModal({ isOpen, onClose }: Props) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    language: "uk",
    theme: "light",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [sendingCode, setSendingCode] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);
  const [resetSuccess, setResetSuccess] = useState<string | null>(null);
  const { updateUser } = useContext(AuthContext);

  useEffect(() => {
    if (isOpen) {
      const storedLanguage = localStorage.getItem("language");
      const storedTheme = localStorage.getItem("theme");

      setFormData(prev => ({
        ...prev,
        language: storedLanguage || prev.language,
        theme: storedTheme || prev.theme,
      }));

      const token = localStorage.getItem("token");
      if (!token) return;

      axios
        .get("http://localhost:3000/api/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setFormData((prev) => ({
            ...prev,
            username: res.data.username || "",
            email: res.data.email || "",
            password: res.data.password || "",
          }));
        })
        .catch((err) => {
          console.error("Помилка завантаження даних користувача:", err);
        });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };

      if (name === "language") {
        localStorage.setItem("language", value);
      }
      if (name === "theme") {
        localStorage.setItem("theme", value);
      }

      return newData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Нема токена авторизації");

      await axios.patch(
        "http://localhost:3000/api/me",
        {
          username: formData.username,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Дані успішно збережено!");
      updateUser({ username: formData.username });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Помилка при збереженні імені");
    }
  };






const sendResetCode = async () => {
    setResetError(null);
    setResetSuccess(null);
    setSendingCode(true);
    setIsResetMode(true);
    try {
      await axios.post('http://localhost:3000/api/send-reset-code', { email: formData.email });
      setCodeSent(true); 
      setResetSuccess('Код підтвердження відправлено на email');
      toast.success('Код підтвердження відправлено на email');
    } catch (e: any) {
      setResetError(e.response?.data?.message || 'Помилка при відправці коду');
      toast.error(e.response?.data?.message || 'Помилка при відправці коду');
    } finally {
      setSendingCode(false);
    }
  };

  const changePassword = async () => {
    setResetError(null);
    setResetSuccess(null);
    if (!confirmationCode || !newPassword) {
      setResetError('Будь ласка, введіть код та новий пароль');
      toast.error('Будь ласка, введіть код та новий пароль');
      return;
    }
    try {
      await axios.post('http://localhost:3000/api/reset-password', {
        email: formData.email,
        code: confirmationCode,
        newPassword
      });
      setResetSuccess('Пароль успішно змінено!');
      toast.success('Пароль успішно змінено!');
      setIsResetMode(false);
      setConfirmationCode('');
      setNewPassword('');

      await fetchDecryptedPassword();
    } catch (e: any) {
      setResetError(e.response?.data?.message || 'Помилка при зміні пароля');
      toast.error(e.response?.data?.message || 'Помилка при зміні пароля');
    }
  };



const fetchDecryptedPassword = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await axios.get("http://localhost:3000/api/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setFormData((prev) => ({
      ...prev,
      password: res.data.password || "",
    }));
  } catch (err) {
    console.error("Помилка оновлення пароля:", err);
  }
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
              
      <div className="bg-white dark:bg-zinc-900 w-full max-w-xl p-6 rounded-2xl shadow-xl relative animate-fade-in overflow-y-auto max-h-[90vh]">
  <ToastContainer position="top-right" autoClose={3000} />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl text-gray-500 hover:text-red-500 transition cursor-pointer"
        >
          ×
        </button>

        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
          ⚙️ Налаштування акаунта
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Ім’я</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 rounded-xl bg-gray-100 dark:bg-zinc-800 dark:text-white border border-gray-300 dark:border-zinc-700"
                required
              />
            </div>

            
          </div>

<div>
  <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Email</label>
  <input
    type="email"
    name="email"
    value={formData.email}
    readOnly
    className="mt-1 w-full px-4 py-2 rounded-xl bg-gray-200 dark:bg-zinc-700 dark:text-white border border-gray-300 dark:border-zinc-700 cursor-not-allowed"
  />
</div>

<div>
  <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Поточний пароль</label>
  <div className="relative mt-1">
    <input
      type={showPassword ? "text" : "password"}
      name="password"
      value={formData.password}
      readOnly
      className="w-full px-4 py-2 pr-10 rounded-xl bg-gray-200 dark:bg-zinc-700 dark:text-white border border-gray-300 dark:border-zinc-700 cursor-not-allowed"
    />
    <button
      type="button"
      className="absolute right-3 top-2.5 text-gray-500 hover:text-blue-500 cursor-pointer"
      onClick={() => setShowPassword((prev) => !prev)}
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </button>
  </div>
</div>


          <div className="bg-gray-50 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 p-4 rounded-xl">
{!isResetMode ? (
  <button
    type="button"
    onClick={sendResetCode}
    disabled={sendingCode}
    className="text-sm text-blue-600 hover:underline disabled:opacity-50 cursor-pointer"
  >
    🔐 Змінити пароль
  </button>
) : (
    <>
      <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
        🔑 Зміна пароля (через email)
      </h3>

      {resetError && (
        <p className="text-red-600 mb-2">{resetError}</p>
      )}
      {resetSuccess && (
        <p className="text-green-600 mb-2">{resetSuccess}</p>
      )}

      {!codeSent ? (
        <button
          type="button"
          onClick={sendResetCode}
          disabled={sendingCode}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition"
        >
          {sendingCode ? 'Відправляємо код...' : 'Відправити код підтвердження'}
        </button>
      ) : (
        <>
          <input
            type="text"
            placeholder="Код підтвердження"
            value={confirmationCode}
            onChange={(e) => setConfirmationCode(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-white dark:bg-zinc-700 dark:text-white border border-gray-300 dark:border-zinc-600 mb-2"
          />
          <input
            type="password"
            placeholder="Новий пароль"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-xl bg-white dark:bg-zinc-700 dark:text-white border border-gray-300 dark:border-zinc-600 mb-4"
          />
          <div className="flex justify-between gap-2">
            <button
              type="button"
              onClick={changePassword}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl transition cursor-pointer"
            >
              ✅ Змінити пароль
            </button>
            <button
              type="button"
              onClick={() => {
                setIsResetMode(false);
                setConfirmationCode('');
                setNewPassword('');
                setResetError(null);
                setResetSuccess(null);
                setCodeSent(false);
              }}
              className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-700 transition cursor-pointer"
            >
              Скасувати
            </button>
          </div>
        </>
      )}
    </>
  )}
</div>


          <div className="grid grid-cols-2 gap-4">
           <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Мова</label>
              <select
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 rounded-xl bg-gray-100 dark:bg-zinc-800 dark:text-white border border-gray-300 dark:border-zinc-700 cursor-pointer"
              >
                <option value="uk" className="cursor-pointer">🇺🇦 Українська</option>
                <option value="en" className="cursor-pointer">🇬🇧 English</option>
                <option value="pl" className="cursor-pointer">🇵🇱 Polski</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Тема</label>
              <select
                name="theme"
                value={formData.theme}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 rounded-xl bg-gray-100 dark:bg-zinc-800 dark:text-white border border-gray-300 dark:border-zinc-700 cursor-pointer"
              >
                <option value="light" className="cursor-pointer">🌞 Світла</option>
                <option value="dark" className="cursor-pointer">🌙 Темна</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-lg transition mt-4 cursor-pointer"
          >
            💾 Зберегти
          </button>
        </form>
      </div>
    </div>
  );
}
