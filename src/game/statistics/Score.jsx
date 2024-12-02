import React from "react";
import { useScoreStore } from "../../store/score";

export const Score = () => {
  const humanScore = useScoreStore((state) => state.humanScore);
  const computerScore = useScoreStore((state) => state.computerScore);
  return (
    <div
      className="w-full border-4 border-gray-300 rounded-xl 
     p-3 space-y-2s text-gray-300"
    >
      <p className="flex items-center justify-between gap-2">
        <span className="font-bold">You:</span>
        <span className="font-bold">{humanScore}</span>
      </p>
      <p className="flex items-center justify-between gap-2">
        <span className="font-bold">Computer:</span>
        <span className="font-bold">{computerScore}</span>
      </p>
    </div>
  );
};
