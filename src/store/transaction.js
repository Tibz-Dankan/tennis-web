import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useTransactionStore = create(
  immer((set) => ({
    isTransacting: false,
    transactions: {},
    updateIsTransacting: (isTransacting) =>
      set(() => ({ isTransacting: isTransacting })),
    updateTransactions: (transactions) =>
      set(() => ({ transactions: transactions })),
    updateFirstTransaction: (transaction) => {
      const clonedTransaction = structuredClone(transaction);
      return set(() => ({ fistTransaction: clonedTransaction }));
    },
  }))
);
