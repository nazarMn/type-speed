import React, { forwardRef, useEffect, useRef } from "react";

interface TypingAreaProps {
  text: string;
  typedIndex: number;
  hasError: boolean;
  onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

const TypingArea = forwardRef<HTMLDivElement, TypingAreaProps>(
  ({ text, typedIndex, hasError, onKeyDown }, ref) => {
    const charRefs = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
      // Прокрутка до поточного символу
      if (typedIndex < charRefs.current.length) {
        const currentCharElement = charRefs.current[typedIndex];
        if (currentCharElement) {
          currentCharElement.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "nearest",
          });
        }
      }
    }, [typedIndex]);

    const renderText = () =>
      text.split("").map((char, i) => {
        let className = "";

        if (i < typedIndex) {
          className = "text-green-600";
        } else if (i === typedIndex) {
          className = hasError ? "bg-red-300" : "bg-yellow-200";
        }

        return (
          <span
            key={i}
            className={className}
            ref={(el) => { charRefs.current[i] = el; }}
          >
            {char}
          </span>
        );
      });

    return (
      <div
        className="w-[90%] h-[74px] text-[41px] pl-4 pr-4 bg-white shadow-md rounded-2xl border border-gray-300 mb-4 text-lg leading-relaxed outline-none cursor-text overflow-y-auto whitespace-pre-wrap break-words custom-scroll"
        tabIndex={0}
        onKeyDown={onKeyDown}
        ref={ref}
      >
        {renderText()}
      </div>
    );
  }
);

export default TypingArea;
