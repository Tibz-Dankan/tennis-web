import { Scene } from "phaser";
import { EventBus } from "../EventBus"; // Import the EventBus

export class GameStart extends Scene {
  constructor() {
    super("GameStart");
  }

  create() {
    this.add
      .text(400, 300, "Game Start - Press Space to Begin", {
        font: "32px Arial",
        fill: "#fff",
      })
      .setOrigin(0.5);

    // Emit event indicating that the GameStart scene is ready
    EventBus.emit("scene-ready", "GameStart");

    // Transition to the next scene when Space is pressed
    this.input.keyboard.on("keydown-SPACE", () => {
      this.scene.start("GameInProgress");
    });
  }
}
