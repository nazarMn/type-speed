import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const AdminLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex p-6 bg-gray-100">
        <Outlet /> {/* Тут буде відображатись контент сторінок */}
      </main>
    </div>
  );
};

export default AdminLayout;
