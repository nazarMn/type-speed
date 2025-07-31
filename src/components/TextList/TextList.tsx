import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./textList.css";

export default function TypingTest() {
  const [text, setText] = useState<string>("");
  const [typedIndex, setTypedIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [cpm, setCpm] = useState<number | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [mistakes, setMistakes] = useState<number>(0);
  const [hasError, setHasError] = useState<boolean>(false);
  const textRef = useRef<HTMLDivElement>(null);

  const fetchText = async () => {
    try {
      const res = await axios.get<{ text: string }>(
        "http://localhost:3000/api/random-text"
      );
      setText(res.data.text);
    } catch (err) {
      console.error(err);
      setText("Помилка завантаження тексту.");
    }
  };

  useEffect(() => {
    fetchText();
  }, []);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
    if (timeLeft === 0 && !isFinished) {
      finishTest();
    }
  }, [isActive, timeLeft, isFinished]);

  useEffect(() => {
    if (textRef.current) {
      textRef.current.focus();
    }
  }, [text]);

 const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
  if (isFinished || !text) return;

  if (e.key === " " || e.key === "Spacebar") {
    e.preventDefault();
  }

  if (!isActive) setIsActive(true);

  if (e.key.length === 1) {
    const currentChar = text[typedIndex];

    if (e.key === currentChar) {
      const newIndex = typedIndex + 1;
      setTypedIndex(newIndex);
      setHasError(false);

      const correctChars = newIndex - mistakes;
      const elapsedMinutes = (60 - timeLeft) / 60;

      if (elapsedMinutes > 0) {
        setCpm(Math.round(correctChars / elapsedMinutes));
        setAccuracy(
          Math.max(
            0,
            Math.round((correctChars / (correctChars + mistakes)) * 100)
          )
        );
      }

      if (newIndex >= text.length) {
        finishTest();
      }
    } else {
      setMistakes((prev) => prev + 1);
      setHasError(true);

      const correctChars = typedIndex - mistakes;
      setAccuracy(
        Math.max(
          0,
          Math.round(
            (correctChars / (correctChars + mistakes + 1)) * 100
          )
        )
      );
    }
  }
};

  const startTest = () => {
    setIsActive(true);
    setIsFinished(false);
    setTypedIndex(0);
    setTimeLeft(60);
    setCpm(null);
    setAccuracy(null);
    setMistakes(0);
    setHasError(false);
    if (textRef.current) textRef.current.focus();
  };

  const finishTest = () => {
    setIsActive(false);
    setIsFinished(true);
  };

  const restartTest = async () => {
    await fetchText();
    setIsActive(false);
    setIsFinished(false);
    setTypedIndex(0);
    setTimeLeft(60);
    setCpm(null);
    setAccuracy(null);
    setMistakes(0);
    setHasError(false);
    if (textRef.current) textRef.current.focus();
  };

  const renderText = () => {
    return text.split("").map((char, i) => {
      let className = "";

      if (i < typedIndex) {
        className = "text-green-600";
      } else if (i === typedIndex) {
        className = hasError ? "bg-red-300" : "bg-yellow-200";
      }

      return (
        <span key={i} className={className}>
          {char}
        </span>
      );
    });
  };

useEffect(() => {
  if (textRef.current) {
    const container = textRef.current;
    const activeChar = container.querySelector(
      "span.bg-yellow-200, span.bg-red-300"
    );

    if (activeChar) {
      const activeCharRect = activeChar.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      if (activeCharRect.bottom > containerRect.bottom) {
        container.scrollTop += activeCharRect.bottom - containerRect.bottom + 5;
      }

      if (activeCharRect.top < containerRect.top) {
        container.scrollTop -= containerRect.top - activeCharRect.top + 5;
      }
    }
  }
}, [typedIndex]);






  return (
    <div className="flex flex-col items-center">
      <h2 className="text-[48px] font-bold mb-4 text-[#0A335C] ">
        Тест швидкості друку
      </h2>
   

      <div className="text-xl font-bold text-[#0A335C] mb-3">Час: {timeLeft} с</div>

<div
  className="w-[90%] h-[74px] text-[41px] pl-4 pr-4 bg-white shadow-md rounded-2xl border border-gray-300 mb-4 text-lg leading-relaxed outline-none cursor-text overflow-y-auto whitespace-pre-wrap break-words custom-scroll"
  tabIndex={0}
  onKeyDown={handleKeyDown}
  ref={textRef}
>
  {renderText()}
</div>




      {!isActive && !isFinished && (
        <button
          className="bg-[#0A335C] text-white px-6 py-2 rounded-xl hover:bg-[#0a447d]"
          onClick={startTest}
        >
          Старт
        </button>
      )}

      {isFinished && (
        <div className="mt-4 text-xl font-bold text-[#0A335C] flex flex-col items-center">
          <div className="mb-4 flex items-center gap-16">
          <p>
            Швидкість: <span className="text-green-600">{cpm}</span> зн./хв
          </p>
          <p>
            Помилок: <span className="text-red-600">{mistakes}</span>
          </p>
          <p>
            Точність: <span className="text-blue-600">{accuracy}%</span>
          </p>

          </div>
          <button
            className="mt-4 bg-[#0A335C] text-white px-6 py-2 rounded-xl hover:bg-[#0a447d]"
            onClick={restartTest}
          >
            Пройти ще раз
          </button>
        </div>
      )}
    </div>
  );
}