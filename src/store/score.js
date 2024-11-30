import { create } from "zustand";

export const useScoreStore = create((set) => ({
  humanScore: 0,
  computerScore: 0,
  updateHumanScore: (score) => set(() => ({ humanScore: score })),
  updateComputerScore: (score) => set(() => ({ computerScore: score })),
}));
