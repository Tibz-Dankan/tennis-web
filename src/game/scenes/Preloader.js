import { Scene } from "phaser";

export class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  preload() {
    const { width, height } = this.sys.game.canvas;

    const centerX = width / 2;
    const centerY = height / 2;

    // Display a loading message
    this.add
      .text(centerX, centerY, "Loading...", { fontSize: "32px", color: "#fff" })
      .setOrigin(0.5);

    // Set the asset path
    this.load.setPath("assets");

    // Load game assets
    this.load.image("stadium-bg", "stadium-bg.png");
    this.load.image("racket-blue", "racket-blue.png");
    this.load.image("racket-red", "racket-red.png");
    this.load.image("ball", "ball.png");
    this.load.image("net-posts", "net-posts.png");
    this.load.image("post", "post.png");
    this.load.audio("hitSound", "hit-sound.mp3");

    // Load complete handler
    this.load.on("complete", () => {
      this.scene.start("Game"); // Switch to Game scene
    });
  }
}
