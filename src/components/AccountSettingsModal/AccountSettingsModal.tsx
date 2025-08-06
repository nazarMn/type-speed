import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AccountSettingsModal({ isOpen, onClose }: Props) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    language: "uk",
    theme: "light",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
    alert("✅ Налаштування збережено!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-xl p-6 rounded-2xl shadow-xl relative animate-fade-in overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl text-gray-500 hover:text-red-500 transition"
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
                name="firstName"
                value={formData.firstName}
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
              onChange={handleChange}
              className="mt-1 w-full px-4 py-2 rounded-xl bg-gray-100 dark:bg-zinc-800 dark:text-white border border-gray-300 dark:border-zinc-700"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Поточний пароль</label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 pr-10 rounded-xl bg-gray-100 dark:bg-zinc-800 dark:text-white border border-gray-300 dark:border-zinc-700"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-2.5 text-gray-500 hover:text-blue-500"
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
                onClick={() => setIsResetMode(true)}
                className="text-sm text-blue-600 hover:underline"
              >
                🔐 Змінити пароль
              </button>
            ) : (
              <>
                <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                  🔑 Зміна пароля (через email)
                </h3>

                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Код підтвердження"
                    value={confirmationCode}
                    onChange={(e) => setConfirmationCode(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-white dark:bg-zinc-700 dark:text-white border border-gray-300 dark:border-zinc-600"
                  />
                  <input
                    type="password"
                    placeholder="Новий пароль"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl bg-white dark:bg-zinc-700 dark:text-white border border-gray-300 dark:border-zinc-600"
                  />
                  <div className="flex justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        alert("✅ Пароль змінено (симуляція)");
                        setIsResetMode(false);
                        setConfirmationCode("");
                        setNewPassword("");
                      }}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl transition"
                    >
                      ✅ Змінити пароль
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsResetMode(false)}
                      className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-700 transition"
                    >
                      Скасувати
                    </button>
                  </div>
                </div>
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
                className="mt-1 w-full px-4 py-2 rounded-xl bg-gray-100 dark:bg-zinc-800 dark:text-white border border-gray-300 dark:border-zinc-700"
              >
                <option value="uk">🇺🇦 Українська</option>
                <option value="en">🇬🇧 English</option>
                <option value="pl">🇵🇱 Polski</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Тема</label>
              <select
                name="theme"
                value={formData.theme}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 rounded-xl bg-gray-100 dark:bg-zinc-800 dark:text-white border border-gray-300 dark:border-zinc-700"
              >
                <option value="light">🌞 Світла</option>
                <option value="dark">🌙 Темна</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold text-lg transition mt-4"
          >
            💾 Зберегти
          </button>
        </form>
      </div>
    </div>
  );
}
