import React from "react";
// import { EventBus } from "../EventBus";
import { useControlsStore } from "../../store/controls";

export const StartGame = () => {
  const updateGameStart = useControlsStore((state) => state.updateGameStart);
  const startGameHandler = () => {
    // EventBus.emit("startGame", true);
    updateGameStart(true);
  };

  //   TODO: to add pause btn here
  return (
    <div>
      <button onClick={() => startGameHandler()}>start Game</button>
    </div>
  );
};
