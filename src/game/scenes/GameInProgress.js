import { Scene } from "phaser";
import { EventBus } from "../EventBus"; // Import the EventBus

export class GameInProgress extends Scene {
  constructor() {
    super("GameInProgress");
  }

  create() {
    this.add
      .text(400, 300, "Game In Progress", { font: "32px Arial", fill: "#fff" })
      .setOrigin(0.5);

    // Emit event indicating that the GameInProgress scene is ready
    EventBus.emit("scene-ready", "GameInProgress");

    // Pause functionality (example)
    this.input.keyboard.on("keydown-P", () => {
      this.scene.start("GamePause");
    });
  }
}
