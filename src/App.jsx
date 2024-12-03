import React from "react";
import { PhaserGame } from "./game/PhaserGame";
import { EventBridge } from "./game/bridge/EventBridge";
import { GameStatistics } from "./game/statistics/GameStatistics";
import "./app.css";
import { SocketConfig } from "./socket/SocketConfig";
import { io } from "socket.io-client";
import { serverURL } from "./constants";

export const App = () => {
  // const socketInstance = io("http://localhost:4000");
  const socketInstance = io(serverURL);

  return (
    <div
      className="w-screen min-h-screen text-gray-50 bg-indigo-700
       flex flex-col items-center overflow-y-auto"
    >
      <EventBridge />
      <GameStatistics />
      <PhaserGame />
      <SocketConfig socket={socketInstance} />
    </div>
  );
};
