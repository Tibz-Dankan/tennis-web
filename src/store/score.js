import { create } from "zustand";

export const useScoreStore = create((set) => ({
  humanScore: 0,
  computerScore: 0,
  winner: "",
  updateHumanScore: (score) => set(() => ({ humanScore: score })),
  updateComputerScore: (score) => set(() => ({ computerScore: score })),
  updateWinner: (winner) => set(() => ({ winner: winner })),
}));
