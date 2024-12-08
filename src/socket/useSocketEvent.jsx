import { useEffect } from "react";
import { useScoreStore } from "../store/score";
import { useTransactionStore } from "../store/transaction";

export const useSocketEvent = ({ socket }) => {
  const scoreWinner = useScoreStore((state) => state.winner);
  const updateIsTransacting = useTransactionStore(
    (state) => state.updateIsTransacting
  );
  const updateTransactions = useTransactionStore(
    (state) => state.updateTransactions
  );
  const updateFirstTransaction = useTransactionStore(
    (state) => state.updateFirstTransaction
  );

  useEffect(() => {
    if (scoreWinner === "human" || scoreWinner === "computer") {
      updateIsTransacting(true);
      socket.emit("gameWinner", { winner: scoreWinner });
    }

    return () => {};
  }, [scoreWinner]);

  useEffect(() => {
    socket.on("transactions", (transactions) => {
      updateIsTransacting(false);
      updateTransactions(transactions);
      updateFirstTransaction(transactions?.edges[0]);
    });
  }, []);

  return {};
};
