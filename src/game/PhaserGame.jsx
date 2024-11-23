import React, { useLayoutEffect, useRef } from "react";
import { StartGame } from "./main"; // Import the start game function
import { EventBus } from "./EventBus"; // Import the EventBus

export const PhaserGame = () => {
  const gameContainerRef = useRef(null);

  useLayoutEffect(() => {
    // Check if the game container div is available
    if (gameContainerRef.current) {
      // Create the Phaser game instance and attach it to the container
      const game = StartGame(gameContainerRef.current);

      // Listen for scene readiness events
      const handleSceneReady = (sceneName) => {
        console.log(`Current Scene: ${sceneName}`);
      };

      // Subscribe to the scene-ready event
      EventBus.on("scene-ready", handleSceneReady);

      // Cleanup when the component is unmounted
      return () => {
        // Destroy the Phaser game instance to free up resources
        game.destroy(true);
        // Unsubscribe from the scene-ready event
        EventBus.off("scene-ready", handleSceneReady);
      };
    }
  }, []); // Empty dependency array to ensure this effect runs only once

  return (
    <div
      id="game-container"
      ref={gameContainerRef}
      style={{ width: "100%", height: "100vh" }}
    >
      {/* The Phaser game will be attached to this div */}
    </div>
  );
};
