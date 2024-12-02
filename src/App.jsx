import React from "react";
import { PhaserGame } from "./game/PhaserGame";
import { EventBridge } from "./game/bridge/EventBridge";
import { GameStatistics } from "./game/statistics/GameStatistics";
import "./app.css";

export const App = () => {
  return (
    <div
      className="w-screen min-h-screen text-gray-50 bg-primarys bg-indigo-700
       flex flex-col items-center overflow-y-auto"
    >
      <EventBridge />
      <GameStatistics />
      <PhaserGame />
    </div>
  );
};
