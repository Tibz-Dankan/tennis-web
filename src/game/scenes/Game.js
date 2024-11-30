import { Scene } from "phaser";
import { EventBus } from "../EventBus";

export class Game extends Scene {
  constructor() {
    super("Game");
    this.isGameStarted = false;

    // Initialize scores
    this.humanScore = 0;
    this.computerScore = 0;

    // Track the last player to hit the ball
    this.lastHitter = null;

    // Track if gravity has been applied to the ball
    this.isGravityApplied = false;

    // Store the initial position of the computer racket
    this.computerInitialX = 0;
    this.computerInitialY = 0;
  }

  create() {
    const { width, height } = this.sys.game.canvas;
    const centerX = width / 2;
    const centerY = height / 2;
    const topY = 400;
    const borderRadius = 24;

    const maskGraphics = this.add.graphics();
    maskGraphics.fillStyle(0xffffff, 1);
    maskGraphics.fillRoundedRect(0, 0, width, height, borderRadius);

    const bg = this.add
      .image(centerX, centerY, "bg")
      .setOrigin(0.5)
      .setDisplaySize(width, height);
    bg.setMask(maskGraphics.createGeometryMask());

    this.post = this.add.image(centerX, topY, "post").setOrigin(0.5);

    // Enable physics for the post
    this.physics.world.enable(this.post);
    this.post.body.setImmovable(true);

    // Set the human racket to 5% width from the left and 50% height
    this.humanRacket = this.add
      .image(width * 0.05, height * 0.5, "racket-blue")
      .setOrigin(0.5)
      .setDisplaySize(32, 80);

    // Set the computer racket to 95% width from the right and 50% height
    this.computerRacket = this.add
      .image(width * 0.95, height * 0.5, "racket-red")
      .setOrigin(0.5)
      .setDisplaySize(32, 80);

    // Store the initial position of the computer racket
    this.computerInitialX = this.computerRacket.x;
    this.computerInitialY = this.computerRacket.y;

    this.ball = this.add
      .image(width * 0.2, height * 0.5, "ball")
      .setOrigin(0.5)
      .setDisplaySize(24, 24);

    this.physics.world.enable([
      this.ball,
      this.humanRacket,
      this.computerRacket,
    ]);

    // Ensure ball physics is reset
    this.ball.body.setGravityY(0);
    this.ball.body.setVelocity(0, 0); // Clear initial velocity

    this.startButton = this.add
      .text(centerX, centerY - 200, "Start Game", {
        fontSize: "32px",
        fill: "#fff",
      })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", this.startGame, this);

    this.input.setDefaultCursor("pointer");

    // Display scores
    this.humanScoreText = this.add
      .text(50, 30, `Player: ${this.humanScore}`, {
        fontSize: "24px",
        fill: "#fff",
      })
      .setOrigin(0);

    this.computerScoreText = this.add
      .text(width - 150, 30, `Computer: ${this.computerScore}`, {
        fontSize: "24px",
        fill: "#fff",
      })
      .setOrigin(0);
  }

  startGame() {
    this.startButton.setVisible(false);
    this.isGameStarted = true;

    // Reset ball to initial position and clear physics properties
    this.ball.setPosition(
      this.sys.game.canvas.width * 0.2,
      this.sys.game.canvas.height * 0.5
    );
    this.ball.body.setVelocity(0, 0); // Ensure no velocity is applied
    this.ball.body.setGravityY(0); // Gravity remains disabled

    this.lastHitter = "human"; // Human starts with the serve
    this.isGravityApplied = false; // Reset gravity application state
  }

  update() {
    if (!this.isGameStarted) return;

    const { x, y } = this.input.activePointer;
    const previousHumanRacketY = this.humanRacket.y;
    this.humanRacket.x = Phaser.Math.Clamp(
      x,
      50,
      this.sys.game.canvas.width / 2 - 50
    );
    this.humanRacket.y = Phaser.Math.Clamp(
      y,
      50,
      this.sys.game.canvas.height - 50
    );
    const humanRacketVelocityY = this.humanRacket.y - previousHumanRacketY;

    // Apply gravity only after the ball is hit by the human racket for the first time
    if (this.physics.overlap(this.ball, this.humanRacket)) {
      if (!this.isGravityApplied) {
        this.ball.body.setGravityY(500); // Enable gravity
        this.isGravityApplied = true;
      }

      const distanceFromNet = Math.abs(
        this.ball.x - this.sys.game.canvas.width / 2
      );
      const maxDistance = this.sys.game.canvas.width / 2;

      const horizontalVelocity = 200 + 250 * (distanceFromNet / maxDistance);
      const verticalVelocity = -250 - 150 * (distanceFromNet / maxDistance);

      const intensity = humanRacketVelocityY * 6;
      this.ball.body.setVelocity(
        horizontalVelocity,
        verticalVelocity - intensity
      );

      this.lastHitter = "human"; // Update last hitter
    }

    const maxSpeed = 6;
    const ballDirectionX = this.ball.x - this.computerRacket.x;
    const direction = Math.sign(ballDirectionX);

    // Condition: Start moving the computer racket when the ball is at 45% width from the left and moving towards the computer side
    if (
      this.ball.x > this.sys.game.canvas.width * 0.45 && // Ball is near 45% width from the left side
      this.ball.body.velocity.x > 0 // Ball is moving towards the computer side
    ) {
      // The computer racket should follow the ball towards its side
      if (Math.abs(ballDirectionX) > maxSpeed) {
        this.computerRacket.x += maxSpeed * direction;
      } else {
        this.computerRacket.x += ballDirectionX;
      }

      // Ensure the computer racket stays within its boundary
      this.computerRacket.x = Phaser.Math.Clamp(
        this.computerRacket.x,
        this.sys.game.canvas.width / 2 + 50,
        this.sys.game.canvas.width - 50
      );
    }

    // After hitting the ball, move the racket back to its initial position
    if (this.physics.overlap(this.ball, this.computerRacket)) {
      // Move the computer racket back to its initial position
      this.computerRacket.x = this.computerInitialX;
      this.computerRacket.y = this.computerInitialY;

      const distanceFromNet = Math.abs(
        this.ball.x - this.sys.game.canvas.width / 2
      );
      const maxDistance = this.sys.game.canvas.width / 2;

      const horizontalVelocity = -200 - 250 * (distanceFromNet / maxDistance);
      const verticalVelocity = -250 - 150 * (distanceFromNet / maxDistance);

      this.ball.body.setVelocity(horizontalVelocity, verticalVelocity);

      this.lastHitter = "computer"; // Update last hitter
    }

    // Ball hits the post
    if (this.physics.overlap(this.ball, this.post)) {
      this.handlePostCollision();
    }

    // Ball falls into own boundary
    if (
      this.ball.x < this.sys.game.canvas.width / 2 &&
      this.lastHitter === "human" &&
      this.ball.y > this.sys.game.canvas.height
    ) {
      this.handleOwnBoundaryHit();
    }

    if (
      this.ball.x > this.sys.game.canvas.width / 2 &&
      this.lastHitter === "computer" &&
      this.ball.y > this.sys.game.canvas.height
    ) {
      this.handleOwnBoundaryHit();
    }

    // Ball out of bounds
    if (this.ball.x < 0 || this.ball.x > this.sys.game.canvas.width) {
      this.handleOutOfBounds();
    }
  }

  handleOwnBoundaryHit() {
    if (this.lastHitter === "human") {
      this.computerScore++;
      EventBus.emit("computerScore", this.computerScore);
    } else if (this.lastHitter === "computer") {
      this.humanScore++;
      EventBus.emit("humanScore", this.humanScore);
    }

    this.humanScoreText.setText(`Player: ${this.humanScore}`);
    this.computerScoreText.setText(`Computer: ${this.computerScore}`);

    this.resetGame();
  }

  handlePostCollision() {
    if (this.ball.x < this.sys.game.canvas.width / 2) {
      this.computerScore++;
      EventBus.emit("computerScore", this.computerScore);
    } else {
      this.humanScore++;
      EventBus.emit("humanScore", this.humanScore);
    }

    this.humanScoreText.setText(`Player: ${this.humanScore}`);
    this.computerScoreText.setText(`Computer: ${this.computerScore}`);

    this.resetGame();
  }

  handleOutOfBounds() {
    if (this.ball.x < 0) {
      this.computerScore++;
      EventBus.emit("computerScore", this.computerScore);
    } else {
      this.humanScore++;
      EventBus.emit("humanScore", this.humanScore);
    }

    this.humanScoreText.setText(`Player: ${this.humanScore}`);
    this.computerScoreText.setText(`Computer: ${this.computerScore}`);

    this.resetGame();
  }

  resetGame() {
    this.ball.setPosition(
      this.sys.game.canvas.width * 0.2,
      this.sys.game.canvas.height * 0.5
    );
    this.ball.body.setVelocity(0, 0); // Reset ball velocity
    this.ball.body.setGravityY(0); // Reset gravity

    // Reset rackets to their starting positions
    this.humanRacket.setPosition(
      this.sys.game.canvas.width * 0.05,
      this.sys.game.canvas.height * 0.5
    );
    this.computerRacket.setPosition(
      this.computerInitialX,
      this.computerInitialY
    );

    // Reset last hitter
    this.startButton.setVisible(true);
    this.isGameStarted = false;
  }
}
