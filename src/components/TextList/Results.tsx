import React from "react";

interface ResultsProps {
  cpm: number | null;
  accuracy: number | null;
  mistakes: number;
  onRestart: () => void;
}

const Results: React.FC<ResultsProps> = ({ cpm, accuracy, mistakes, onRestart }) => {
  return (
    <div className="mt-4 text-xl font-bold text-[#0A335C] flex flex-col items-center">
      <div className="mb-4 flex items-center gap-16">
        <p>Швидкість: <span className="text-green-600">{cpm}</span> зн./хв</p>
        <p>Помилок: <span className="text-red-600">{mistakes}</span></p>
        <p>Точність: <span className="text-blue-600">{accuracy}%</span></p>
      </div>
      <button
        className="mt-4 bg-[#0A335C] text-white px-6 py-2 rounded-xl hover:bg-[#0a447d]"
        onClick={onRestart}
      >
        Пройти ще раз
      </button>
    </div>
  );
};

export default Results;
