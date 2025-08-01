import React from "react";

interface RegisterModalProps {
  show: boolean;
  onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-8 w-[400px] text-center shadow-xl">
        <h3 className="text-2xl font-bold mb-4 text-[#0A335C]">
          Зареєструйся!
        </h3>
        <p className="mb-6 text-gray-700">
          Щоб отримати сертифікат про проходження тесту та відкрити інші
          корисні функції, будь ласка, зареєструйmеся.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded-xl hover:bg-gray-400 cursor-pointer"
          >
            Закрити
          </button>
          <button
            onClick={() => (window.location.href = "/register")}
            className="bg-[#0A335C] text-white px-4 py-2 rounded-xl hover:bg-[#0a447d] cursor-pointer"
          >
            Зареєструватися
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;
