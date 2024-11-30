import React from "react";
import { PhaserGame } from "./game/PhaserGame";
import { EventBridge } from "./game/bridge/EventBridge";

const App = () => {
  return (
    <div id="app">
      <EventBridge />
      <PhaserGame />
    </div>
  );
};

export default App;
