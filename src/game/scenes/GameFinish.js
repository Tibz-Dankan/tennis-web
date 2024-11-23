import { Scene } from "phaser";
import { EventBus } from "../EventBus"; // Import the EventBus

export class GameFinish extends Scene {
  constructor() {
    super("GameFinish");
  }

  create() {
    this.add
      .text(400, 300, "Game Over - Press R to Restart", {
        font: "32px Arial",
        fill: "#fff",
      })
      .setOrigin(0.5);

    // Emit event indicating that the GameFinish scene is ready
    EventBus.emit("scene-ready", "GameFinish");

    // Restart functionality (example)
    this.input.keyboard.on("keydown-R", () => {
      this.scene.start("GameStart");
    });
  }
}
