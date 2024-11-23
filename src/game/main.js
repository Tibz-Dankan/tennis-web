import Phaser from "phaser";
import { Preloader } from "./scenes/Preloader";
import { GameStart } from "./scenes/GameStart";
import { GameInProgress } from "./scenes/GameInProgress";
import { GamePause } from "./scenes/GamePause";
import { GameFinish } from "./scenes/GameFinish";
import { EventBus } from "./EventBus";

const config = {
  type: Phaser.WEBGL,
  width: 1024,
  height: 768,
  parent: "game-container",
  backgroundColor: "#000000",
  scene: [Preloader, GameStart, GameInProgress, GamePause, GameFinish],
};

// const game = new Phaser.Game(config);

// Listen for the scene-ready event

EventBus.on("scene-ready", (sceneName) => {
  console.log(`Current Scene: ${sceneName}`);
});

export const StartGame = (parent) => {
  return new Phaser.Game({ ...config, parent });
};

export default StartGame;
