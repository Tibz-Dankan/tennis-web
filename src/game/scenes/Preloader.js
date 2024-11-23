import { Scene } from "phaser";
import { EventBus } from "../EventBus"; // Import the EventBus

export class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  preload() {
    // Loading assets for your game (if any)
  }

  create() {
    this.add
      .text(400, 300, "Loading...", { font: "32px Arial", fill: "#fff" })
      .setOrigin(0.5);

    // Emit event indicating that the Preloader scene is ready
    EventBus.emit("scene-ready", "Preloader");

    // Transition to the next scene
    this.time.delayedCall(2000, () => {
      this.scene.start("GameStart");
    });
  }
}
