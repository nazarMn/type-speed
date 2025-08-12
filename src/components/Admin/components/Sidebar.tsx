import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUsers, FaListAlt, FaTachometerAlt, FaCogs, FaSignOutAlt, FaUsersCog } from 'react-icons/fa';

const Sidebar = () => {
  const menu = [
    { path: '/admin', label: 'Головна', icon: <FaTachometerAlt /> },
    { path: '/admin/users', label: 'Користувачі', icon: <FaUsers /> },
    { path: '/admin/texts', label: 'Тексти', icon: <FaListAlt /> },
    { path: '/admin/leaders', label: 'Лідери дня', icon: <FaUsersCog /> },
    { path: '/admin/settings', label: 'Налаштування', icon: <FaCogs /> },
  ];

  // Проста функція виходу — тут можна замінити на свою логіку
  const handleLogout = () => {
    // наприклад, очистити localStorage / cookie і перекинути на логін
    localStorage.removeItem('token');
    window.location.href = '/login'; 
  };

  return (
    <aside className="bg-gray-900 text-gray-100 w-64 min-h-screen flex flex-col p-5">
      <h1 className="text-3xl font-bold mb-10">TypeSpeed Admin</h1>
      <nav className="flex flex-col flex-grow space-y-4">
        {menu.map((item) => (
          <NavLink
            to={item.path}
            key={item.path}
            end
            className={({ isActive }) =>
              `flex items-center space-x-3 py-2 px-3 rounded hover:bg-gray-700 ${
                isActive ? 'bg-gray-700 font-semibold' : ''
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <button
        onClick={handleLogout}
        className="mt-auto flex items-center space-x-3 p-2 rounded hover:bg-red-700 text-red-400 font-semibold"
      >
        <FaSignOutAlt />
        <span>Вийти</span>
      </button>
    </aside>
  );
};

export default Sidebar;
