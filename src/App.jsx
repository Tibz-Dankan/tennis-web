import React, { useState } from "react";
import { PhaserGame } from "./game/PhaserGame";

const App = () => {
  const [showGame, setShowGame] = useState(true);

  const toggleGame = () => {
    setShowGame(!showGame);
  };

  return (
    <div id="app">
      <header
        style={{
          textAlign: "center",
          padding: "10px",
          backgroundColor: "#028af8",
          color: "#fff",
        }}
      >
        <h1>2D Tennis Game</h1>
        <p>Human vs. Computer</p>
      </header>
      <div style={{ margin: "10px", textAlign: "center" }}>
        <button className="button" onClick={toggleGame}>
          {showGame ? "Hide Game" : "Show Game"}
        </button>
      </div>
      {showGame ? (
        <div
          style={{
            width: "100%",
            height: "calc(100vh - 120px)",
            position: "relative",
          }}
        >
          <PhaserGame />
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "20px",
            fontSize: "1.2em",
            color: "#fff",
          }}
        >
          <p>Game is currently hidden. Click "Show Game" to resume.</p>
        </div>
      )}
    </div>
  );
};

export default App;
