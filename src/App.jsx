import React from "react";
import { PhaserGame } from "./game/PhaserGame";
import { EventBridge } from "./game/bridge/EventBridge";
import { GameControls } from "./game/controls/GameControls";
import "./app.css";

const App = () => {
  return (
    <div id="app" className="bg-primary flex flex-col items-center">
      <EventBridge />
      <PhaserGame />
      <GameControls />
    </div>
  );
};

export default App;
