import { create } from "zustand";

export const useTransactionStore = create((set) => ({
  isTransacting: false,
  transactions: {},
  fistTransaction: {},
  updateIsTransacting: (isTransacting) =>
    set(() => ({ isTransacting: isTransacting })),
  updateTransactions: (transactions) =>
    set(() => ({ transactions: transactions })),
  updateFirstTransaction: (transaction) =>
    set(() => ({ fistTransaction: transaction })),
}));
