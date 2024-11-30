import { Scene } from "phaser";

export class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  preload() {
    // Display a loading message
    this.add
      .text(400, 300, "Loading...", { fontSize: "32px", color: "#fff" })
      .setOrigin(0.5);

    // Set the asset path
    this.load.setPath("assets");

    // Load game assets
    this.load.image("bg", "bg.png");
    this.load.image("racket-blue", "racket-blue.png");
    this.load.image("racket-red", "racket-red.png");
    this.load.image("ball", "ball.png");
    this.load.image("net-posts", "net-posts.png");
    this.load.image("post", "post.png");

    // Load complete handler
    this.load.on("complete", () => {
      this.scene.start("Game"); // Switch to Game scene
    });
  }
}