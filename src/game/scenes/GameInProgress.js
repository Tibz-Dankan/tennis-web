import { Scene } from "phaser";

export class GameInProgress extends Scene {
  constructor() {
    super("GameInProgress");
  }

  create() {
    // Game background
    this.add.image(400, 300, "bg").setOrigin(0.5).setDisplaySize(800, 600);

    // Rackets and ball
    this.humanRacket = this.add.image(100, 300, "racket-blue");
    this.computerRacket = this.add.image(700, 300, "racket-red");
    this.ball = this.add.image(400, 300, "ball");

    // Game state flag
    this.isGameRunning = false;

    // Start Button
    this.startButton = this.add
      .text(400, 300, "Start Game", {
        fontSize: "32px",
        backgroundColor: "#000",
        color: "#fff",
      })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => {
        this.startGame();
      });

    // Pause Button
    this.pauseButton = this.add
      .text(700, 30, "Pause", {
        fontSize: "24px",
        backgroundColor: "#000",
        color: "#fff",
      })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => {
        this.pauseGame();
      })
      .setVisible(false);

    // Resume Button
    this.resumeButton = this.add
      .text(700, 30, "Resume", {
        fontSize: "24px",
        backgroundColor: "#000",
        color: "#fff",
      })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => {
        this.resumeGame();
      })
      .setVisible(false);
  }

  startGame() {
    this.isGameRunning = true;
    this.startButton.setVisible(false);
    this.pauseButton.setVisible(true);
    // Logic to start ball movement or enable AI
    console.log("Game Started");
  }

  pauseGame() {
    this.isGameRunning = false;
    this.pauseButton.setVisible(false);
    this.resumeButton.setVisible(true);
    // Logic to freeze game elements
    console.log("Game Paused");
  }

  resumeGame() {
    this.isGameRunning = true;
    this.resumeButton.setVisible(false);
    this.pauseButton.setVisible(true);
    // Logic to unfreeze game elements
    console.log("Game Resumed");
  }
}
