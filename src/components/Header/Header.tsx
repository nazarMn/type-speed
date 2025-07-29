import React from 'react'

export default function Header() {
  return (
    <header className="w-full h-[80px]  flex items-center justify-between px-10">
      

      <div className="flex items-center">
        <h1 className="text-2xl font-extrabold cursor-pointer hover:text-[#1a4f8a] transition">
          TypeSpeed
        </h1>
      </div>

      <nav className="flex items-center gap-18">
        <h2 className="text-2xl font-bold cursor-pointer hover:text-[#1a4f8a] transition">Тестування</h2>
        <h2 className="text-2xl font-bold cursor-pointer hover:text-[#1a4f8a] transition">Лідери</h2>
        <h2 className="text-2xl font-bold cursor-pointer hover:text-[#1a4f8a] transition">Історія</h2>
      </nav>

      <div className="flex items-center gap-4">
        <button className="text-lg font-semibold text-white bg-[#0A335C] px-5 py-2 rounded-xl hover:bg-[#1a4f8a] transition">
          Вхід
        </button>
        <i className="fa-solid fa-user-astronaut fa-xl cursor-pointer text-[#0A335C] hover:text-[#1a4f8a] transition"></i>
      </div>
      
    </header>
  )
}
