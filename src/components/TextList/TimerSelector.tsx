import React from "react";

interface TimerSelectorProps {
  selectedTime: number;
  onSelect: (time: number) => void;
}

const TimerSelector: React.FC<TimerSelectorProps> = ({ selectedTime, onSelect }) => {
  const times = [30, 60, 120];
  return (
    <div className="mb-4 flex gap-4">
      {times.map((t) => (
        <button
          key={t}
          className={`px-5 py-2 rounded-full transition-all duration-200 border-2 text-lg font-semibold 
            ${selectedTime === t
              ? "bg-[#0A335C] text-white border-[#0A335C] scale-110 shadow-md"
              : "bg-white text-[#0A335C] border-gray-300 hover:bg-[#e7eef7]"}`}
          onClick={() => onSelect(t)}
        >
          {t} c
        </button>
      ))}
    </div>
  );
};

export default TimerSelector;
