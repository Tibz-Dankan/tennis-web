import React from "react";
import { PhaserGame } from "./game/PhaserGame";
import { EventBridge } from "./game/bridge/EventBridge";
import { GameControls } from "./game/controls/GameControls";

const App = () => {
  return (
    <div id="app">
      <EventBridge />
      <PhaserGame />
      <GameControls />
    </div>
  );
};

export default App;
