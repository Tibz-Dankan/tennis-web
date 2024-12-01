import React from "react";
import { StartGame } from "./StartGame";
// import { useControlsStore } from "../../store/controls";
import { useScoreStore } from "../../store/score";

export const GameControls = () => {
  const winner = useScoreStore((state) => state.winner);

  const showStartGameBtn = winner !== "pending";

  return <div>{showStartGameBtn && <StartGame />}</div>;
};
