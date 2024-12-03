import { useEffect } from "react";
import { useScoreStore } from "../store/score";

export const useSocketEvent = ({ socket }) => {
  const scoreWinner = useScoreStore((state) => state.winner);

  useEffect(() => {
    if (scoreWinner === "human" || scoreWinner === "computer") {
      socket.emit("gameWinner", { winner: scoreWinner });
    }

    return () => {
      // socket.disconnect();
    };
  }, [scoreWinner]);

  return {};
};
