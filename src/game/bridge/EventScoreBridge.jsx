import React, { useEffect } from "react";
import { useScoreStore } from "../../store/score";
import { EventBus } from "../EventBus";

export const EventScoreBridge = () => {
  const updateHumanScore = useScoreStore((state) => state.updateHumanScore);
  const updateComputerScore = useScoreStore(
    (state) => state.updateComputerScore
  );

  useEffect(() => {
    EventBus.on("humanScore", (score) => {
      updateHumanScore(score);
    });

    EventBus.on("computerScore", (score) => {
      updateComputerScore(score);
    });

    return () => {
      EventBus.removeListener("humanScore");
      EventBus.removeListener("computerScore");
    };
  }, []);
  return <div>EventScoreBridge</div>;
};
