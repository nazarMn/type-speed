import React from 'react'

export default function Registration() {
  return (
    <div className="w-full flex justify-center items-center h-screen bg-gradient-to-br from-blue-100 via-gray-100 to-blue-50">
      <div className="w-[540px] h-[520px] bg-white shadow-2xl rounded-2xl flex flex-col items-center px-10 py-8">
        
        <h1 className="text-4xl font-extrabold mb-3 text-blue-700 tracking-wide">
          TypeSpeed
        </h1>
        
        <h2 className="text-lg text-gray-600 mb-8">
          Увійти або зареєструватися
        </h2>
        
        <button className="w-full flex items-center justify-center gap-3 py-3 px-5 bg-white border border-gray-300 rounded-lg hover:shadow-md transition-all duration-200 cursor-pointer">
          <img
            className="w-6 h-6 "
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google Icon"
          />
          <span className="text-gray-700 font-medium">Продовжити з Google</span>
        </button>

        <div className="w-full flex items-center my-6">
          <span className="flex-grow h-px bg-gray-300"></span>
          <span className="px-3 text-gray-400 text-sm">або</span>
          <span className="flex-grow h-px bg-gray-300"></span>
        </div>

        <form className="w-full flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="Пароль"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all cursor-pointer">
            Увійти
          </button>
        </form>
        
        <p className="text-gray-500 text-sm mt-5">
          Ще не маєте акаунта? <span className="text-blue-600 hover:underline cursor-pointer">Зареєструватися</span>
        </p>
      </div>
    </div>
  )
}
