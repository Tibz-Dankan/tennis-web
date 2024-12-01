import React from "react";
import { useControlsStore } from "../../store/controls";
import { PlayIcon } from "../../icons/PlayIcon";
import { useScoreStore } from "../../store/score";

export const StartGame = () => {
  const updateGameStart = useControlsStore((state) => state.updateGameStart);
  const winner = useScoreStore((state) => state.winner);

  const startGameHandler = () => {
    updateGameStart(true);
  };

  const disablePlayBtn = winner === "pending";

  return (
    <div>
      <button
        onClick={() => startGameHandler()}
        className="bg-indigo-400  px-4 py-2 rounded-md disabled:opacity-50
        flex items-center justify-center gap-2 transition-all cursor-pointer"
        disabled={disablePlayBtn}
      >
        <span>
          <PlayIcon />
        </span>
        <span>Play</span>
      </button>
    </div>
  );
};
