import React from "react";

interface LanguageSelectorProps {
  selectedLanguage: string;
  onSelect: (lang: string) => void;
}

const languages = [
  { code: "uk", label: "🇺🇦 Українська" },
  { code: "en", label: "🇬🇧 English" },
  { code: "pl", label: "🇵🇱 Polski" }
];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onSelect
}) => {
  return (
    <div className="mb-4 flex gap-4">
      {languages.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => onSelect(code)}
          className={`px-5 py-2 rounded-full transition-all duration-200 border-2 text-lg font-semibold cursor-pointer
            ${
              selectedLanguage === code
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

export default LanguageSelector;
