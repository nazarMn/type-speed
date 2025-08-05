import React from "react";

const StartButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    className="bg-[#0A335C] text-white px-6 py-2 rounded-xl text-lg font-semibold hover:bg-[#0a447d] cursor-pointer shadow-md"
    onClick={onClick}
  >
    Старт
  </button>
);

export default StartButton
