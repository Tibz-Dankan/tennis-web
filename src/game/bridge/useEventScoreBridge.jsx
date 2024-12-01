import { useEffect } from "react";
import { useScoreStore } from "../../store/score";
import { EventBus } from "../EventBus";

export const useEventScoreBridge = () => {
  const updateHumanScore = useScoreStore((state) => state.updateHumanScore);
  const updateComputerScore = useScoreStore(
    (state) => state.updateComputerScore
  );
  const updateWinner = useScoreStore((state) => state.updateWinner);

  useEffect(() => {
    EventBus.on("humanScore", (score) => {
      updateHumanScore(score);
    });

    EventBus.on("computerScore", (score) => {
      updateComputerScore(score);
    });

    EventBus.on("winner", (winner) => {
      updateWinner(winner);
    });

    return () => {
      EventBus.removeListener("humanScore");
      EventBus.removeListener("computerScore");
      EventBus.removeListener("winner");
    };
  }, []);
  return {};
};
