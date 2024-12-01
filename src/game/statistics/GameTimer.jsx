import React, { useState, useEffect } from "react";
import { EventBus } from "../EventBus";
import { ClockIcon } from "../../icons/ClockIcon";

export const GameTimer = () => {
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const startGameListener = (isGameStart) => {
      if (isGameStart) {
        setTimer(0);
        setIsRunning(true);
      } else {
        setTimer(0);
        setIsRunning(false);
      }
    };

    EventBus.on("startGame", startGameListener);

    return () => {
      EventBus.off("startGame", startGameListener);
    };
  }, []);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div
      className="flex items-center justify-center gap-2 bg-indigo-400
     rounded-lg px-4 py-2 w-40 shadow"
    >
      <ClockIcon className="w-7 h-7" />
      <span className="text-2xl font-semibold w-16">{formatTime(timer)}</span>
    </div>
  );
};
