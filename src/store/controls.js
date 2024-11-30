import { create } from "zustand";

export const useControlsStore = create((set) => ({
  start: false,
  pause: false,
  updateGameStart: (start) => set(() => ({ start: start })),
  updateGamePause: (pause) => set(() => ({ pause: pause })),
  resetGame: () => set(() => ({ start: false, pause: false })), //To try out this one
}));
