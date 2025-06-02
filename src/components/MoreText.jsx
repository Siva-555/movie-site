import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const MoreText = ({ className, text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      const lineHeight = parseFloat( getComputedStyle(textRef.current).lineHeight);
      const maxHeight = lineHeight * 3; // Height for 3 lines
      setShowMoreButton(textRef.current.scrollHeight > maxHeight);
    }
  }, [text]);

  return (
    <div className={cn("relative ", className)}>
      <p
        ref={textRef}
        className={`transition-all duration-500 ${isExpanded ? "line-clamp-none" : "line-clamp-3"}`}
      >
        {text}
      </p>
      {showMoreButton && (
        <>
          { !isExpanded && <div className="absolute top-0 bottom-0 -left-2 -right-2 -translate-y-5 transition-all duration-300 z-[1] bg-gradient-to-t from-black/20 from-0% to-transparent to-100% " />}
          <button
            className={cn(
              "mt-1 z-[5] w-fit bg-slate-600 hover:bg-slate-700 transition-all duration-300 rounded-2xl px-2.5 pt-0.5 pb-1 text-xs flex flex-row items-center gap-1 cursor-pointer ",
              isExpanded ? "":"-translate-y-4"
            )}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Less" : "More"}
            <ChevronDown
              className={` transition-transform duration-500 ${isExpanded ? "-rotate-180" : ""}`}
              size={14}
            />
          </button>
        </>
      )}
    </div>
  );
};

export default MoreText;
