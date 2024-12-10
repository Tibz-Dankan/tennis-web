import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useTransactionStore = create(
  immer((set) => ({
    isTransacting: false,
    transactions: {},
    fistTransaction: {},
    updateIsTransacting: (isTransacting) =>
      set(() => ({ isTransacting: isTransacting })),
    updateTransactions: (transactions) =>
      set(() => ({ transactions: transactions })),
    updateFirstTransaction: (transaction) =>
      set(() => ({ fistTransaction: transaction })),
  }))
);
