import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./textList.css";
import TimerSelector from "./TimerSelector";
import TypingArea from "./TypingArea";
import Results from "./Results";
import StartButton from "./StartButton";
import LanguageSelector from "./LanguageSelector";
import RegisterModal from "../RegisterModal/RegisterModal";

export default function TypingTest() {
  const [text, setText] = useState<string>("");
  const [typedIndex, setTypedIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [selectedTime, setSelectedTime] = useState<number>(60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [cpm, setCpm] = useState<number | null>(null);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [mistakes, setMistakes] = useState<number>(0);
  const [hasError, setHasError] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const textRef = useRef<HTMLDivElement | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("uk");

  

const fetchText = async () => {
  try {
    const res = await axios.get<{ text: string }>(
      `http://localhost:3000/api/random-text?lang=${selectedLanguage}`
    );
    setText(res.data.text);
  } catch (err) {
    console.error(err);
    setText("Помилка завантаження тексту.");
  }
};

useEffect(() => {
  fetchText();
}, [selectedLanguage]);

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

  // const handleTimeSelect = (t: number) => {
  //   setSelectedTime(t);
  //   if (!isActive && !isFinished) {
  //     setTimeLeft(t);
  //   }
  // };

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
        const elapsedMinutes = (selectedTime - timeLeft) / 60;

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
            Math.round((correctChars / (correctChars + mistakes + 1)) * 100)
          )
        );
      }
    }
  };

  const startTest = () => {
    setIsActive(true);
    setIsFinished(false);
    setTypedIndex(0);
    setTimeLeft(selectedTime);
    setCpm(null);
    setAccuracy(null);
    setMistakes(0);
    setHasError(false);
    if (textRef.current) textRef.current.focus();
  };

const finishTest = async () => {
  setIsActive(false);
  setIsFinished(true);

  const elapsedSeconds = selectedTime - timeLeft;
  const elapsedMinutes = elapsedSeconds > 0 ? elapsedSeconds / 60 : 1 / 60;

  const correctChars = Math.max(0, typedIndex - mistakes);
  const totalTyped = Math.max(typedIndex, 1); 

  const finalCpm = Math.max(0, Math.round(correctChars / elapsedMinutes));
  const finalAccuracy = Math.max(
    0,
    Math.min(100, Math.round((correctChars / totalTyped) * 100))
  );

  const finalErrors = Math.max(0, mistakes);

  setCpm(finalCpm);
  setAccuracy(finalAccuracy);
  setMistakes(finalErrors);

  const token = localStorage.getItem("token");
  if (!token) {
    setShowModal(true);
  } else {
    setShowModal(false);
    try {
      await axios.post(
        "http://localhost:3000/api/me/test-result",
        {
          cpm: finalCpm,
          accuracy: finalAccuracy,
          errors: finalErrors,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.error("Помилка при збереженні результату:", error);
    }
  }
};




  const restartTest = async () => {
    await fetchText();
    setIsActive(false);
    setIsFinished(false);
    setTypedIndex(0);
    setTimeLeft(selectedTime);
    setCpm(null);
    setAccuracy(null);
    setMistakes(0);
    setHasError(false);
    if (textRef.current) textRef.current.focus();
  };
  

  return (
    <div className="flex flex-col items-center relative">
      <h2 className="text-[48px] font-bold mb-4 text-[#0A335C]">
        Тест швидкості друку
      </h2>

     <div className="w-full flex justify-evenly items-center mb-4 px-4">
 <LanguageSelector
  selectedLanguage={selectedLanguage}
  onSelect={(lang) => {
    if (!isActive && !isFinished) {
      setSelectedLanguage(lang);
    }
  }}
/>

  <TimerSelector
    selectedTime={selectedTime}
    onSelect={(time) => {
      setSelectedTime(time);
      if (!isActive && !isFinished) {
        setTimeLeft(time);
      }
    }}
  />
</div>


      <div className="text-2xl font-bold text-[#0A335C] mb-3">
        Час: {timeLeft} с
      </div>

   <TypingArea
  text={text}
  typedIndex={typedIndex}
  hasError={hasError}
  onKeyDown={handleKeyDown}
  ref={textRef}
/>

      {!isActive && !isFinished && <StartButton onClick={startTest} />}

      {isFinished && (
        <Results
          cpm={cpm}
          accuracy={accuracy}
          mistakes={mistakes}
          onRestart={restartTest}
        />
      )}

      <RegisterModal show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
