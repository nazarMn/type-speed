import React from "react";

interface DifficultySelectorProps {
  selectedDifficulty: string;
  onSelect: (difficulty: string) => void;
}

const difficulties = [
  { code: "Легкий", label: "🟢 Легкий" },
  { code: "Середній", label: "🟡 Середній" },
  { code: "Важкий", label: "🔴 Важкий" }
];

const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  selectedDifficulty,
  onSelect
}) => {
  return (
    <div className="mb-4 flex gap-4">
      {difficulties.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => onSelect(code)}
          className={`px-5 py-2 rounded-full transition-all duration-200 border-2 text-lg font-semibold cursor-pointer
            ${
              selectedDifficulty === code
                ? "bg-[#0A335C] text-white border-[#0A335C] scale-110 shadow-md"
                : "bg-white text-[#0A335C] border-gray-300 hover:bg-[#e7eef7]"
            }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default DifficultySelector;
