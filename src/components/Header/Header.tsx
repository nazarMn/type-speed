import React from 'react'



export default function Header() {
  return (
    <header className="w-full h-[90px] text-[#0A335C] flex items-center justify-between px-8 pl-[120px]">

        <div className="w-[70%] h-full flex items-center justify-between text-[28px] font-bold ">
        
        <h2 className='cursor-pointer'>Тестування </h2>

        <h2 className='cursor-pointer'>Лідери</h2>

        <h2 className='cursor-pointer'>Історія </h2>

        </div>

        <div className="w-[30%] h-full flex items-center justify-center pt-2 pr-[38px]">

            <div className="w-[80%] h-full flex items-center justify-end gap-2">

            <h2 className='cursor-pointer text-[#0A335C] font-bold text-[24px]'>Вхід</h2>

         <i className="fa-solid fa-user-astronaut fa-2xl cursor-pointer"></i>

         </div>


        </div>

       
        
    </header>
  )
}
