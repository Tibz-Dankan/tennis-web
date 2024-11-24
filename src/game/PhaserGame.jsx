import React, { useLayoutEffect } from "react";
import Phaser from "phaser";
import { Preloader } from "./scenes/Preloader";
import { Game } from "./scenes/Game";

export function PhaserGame() {
  useLayoutEffect(() => {
    // Calculate 80% of the window dimensions
    const width = window.innerWidth * 0.8;
    const height = window.innerHeight * 0.8;

    const config = {
      type: Phaser.AUTO,
      width,
      height,
      parent: "game-container",
      scene: [Preloader, Game],
      // scale: {
      //   mode: Phaser.Scale.FIT, // Ensures the game fits the container
      //   // autoCenter: Phaser.Scale.CENTER_BOTH,
      //   zoom: 1, // Set zoom to 1 to avoid any zoom animation
      // },
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 },
          debug: true,
        },
      },
    };

    const game = new Phaser.Game(config);

    // Handle resizing without zoom animation
    const resizeGame = () => {
      const newWidth = window.innerWidth * 0.8;
      const newHeight = window.innerHeight * 0.8;
      game.scale.resize(newWidth, newHeight); // Resize the canvas to fit the new dimensions
    };

    window.addEventListener("resize", resizeGame);

    return () => {
      game.destroy(true);
      window.removeEventListener("resize", resizeGame);
    };
  }, []);

  return <div id="game-container"></div>;
}
