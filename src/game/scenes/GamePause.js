import { Scene } from "phaser";
import { EventBus } from "../EventBus"; // Import the EventBus

export class GamePause extends Scene {
  constructor() {
    super("GamePause");
  }

  create() {
    this.add
      .text(400, 300, "Game Paused - Press P to Resume", {
        font: "32px Arial",
        fill: "#fff",
      })
      .setOrigin(0.5);

    // Emit event indicating that the GamePause scene is ready
    EventBus.emit("current-scene-ready", this);

    // Resume functionality (example)
    this.input.keyboard.on("keydown-P", () => {
      this.scene.start("GameInProgress");
    });
  }
}
