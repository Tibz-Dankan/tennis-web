import { Scene } from "phaser";

export class Game extends Scene {
  constructor() {
    super("Game");
    this.isGameStarted = false;
  }

  create() {
    // Get the center of the game screen
    const { width, height } = this.sys.game.canvas;
    const centerX = width / 2;
    const centerY = height / 2;
    const topY = 400;

    // Define the border radius
    const borderRadius = 24;

    // Create a mask graphics object for the rounded corners
    const maskGraphics = this.add.graphics();
    maskGraphics.fillStyle(0xffffff, 1); // White color for the mask
    maskGraphics.fillRoundedRect(0, 0, width, height, borderRadius);

    // Add the background image in the center of the canvas
    const bg = this.add
      .image(centerX, centerY, "bg")
      .setOrigin(0.5)
      .setDisplaySize(width, height);

    // Apply the rounded rectangle mask to the background image
    bg.setMask(maskGraphics.createGeometryMask());

    // Add the net (post) image centered horizontally and aligned to the bottom
    this.add.image(centerX, topY, "post").setOrigin(0.5);

    // Add the human player's racket on the left with specific size
    this.humanRacket = this.add
      .image(centerX - 300, centerY, "racket-blue")
      .setOrigin(0.5)
      .setDisplaySize(32, 80); // Set the width to 32px and height to 80px

    // Add the computer player's racket on the right
    this.computerRacket = this.add
      .image(centerX + 300, centerY, "racket-red")
      .setOrigin(0.5)
      .setDisplaySize(32, 80); // Set the width to 32px and height to 80px

    // Add the ball, positioned beside the human racket initially
    this.ball = this.add
      .image(centerX - 250, centerY, "ball")
      .setOrigin(0.5)
      .setDisplaySize(24, 24);

    // Enable physics for the ball and rackets
    this.physics.world.enable([
      this.ball,
      this.humanRacket,
      this.computerRacket,
    ]);

    // Set gravity on the ball
    this.ball.body.setGravityY(500); // Gravity pulling the ball down

    // Create a start game button
    this.startButton = this.add
      .text(centerX, centerY - 200, "Start Game", {
        fontSize: "32px",
        fill: "#fff",
      })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", this.startGame, this);

    // Add cursor input
    this.input.setDefaultCursor("pointer");
  }

  startGame() {
    // Hide the start button after the game starts
    this.startButton.setVisible(false);

    // Start the game by allowing the human player to move their racket
    this.isGameStarted = true;

    // Reset the ball's position and velocity to simulate the game starting
    this.ball.setPosition(this.humanRacket.x + 50, this.humanRacket.y);
    this.ball.body.setVelocity(120, -220); // Increased initial velocity
  }

  update() {
    if (!this.isGameStarted) return;

    const { x, y } = this.input.activePointer;

    // Human racket movement (left section)
    const previousHumanRacketY = this.humanRacket.y; // Store previous Y position
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
    const humanRacketVelocityY = this.humanRacket.y - previousHumanRacketY; // Calculate Y velocity

    // Computer racket AI movement (horizontal only)
    const maxSpeed = 6; // Increased speed for computer racket
    const ballDirectionX = this.ball.x - this.computerRacket.x; // Compute horizontal difference
    const direction = Math.sign(ballDirectionX); // Determine movement direction (-1 for left, 1 for right)

    if (Math.abs(ballDirectionX) > maxSpeed) {
      this.computerRacket.x += maxSpeed * direction;
    } else {
      this.computerRacket.x += ballDirectionX;
    }

    // Ensure the computer racket stays within its allowed bounds
    this.computerRacket.x = Phaser.Math.Clamp(
      this.computerRacket.x,
      this.sys.game.canvas.width / 2 + 50,
      this.sys.game.canvas.width - 50
    );

    // Ball and racket collision handling
    if (this.physics.overlap(this.ball, this.humanRacket)) {
      const distanceFromNet = Math.abs(
        this.ball.x - this.sys.game.canvas.width / 2
      );
      const maxDistance = this.sys.game.canvas.width / 2;

      const horizontalVelocity = 200 + 250 * (distanceFromNet / maxDistance); // Increased multiplier
      const verticalVelocity = -250 - 150 * (distanceFromNet / maxDistance);

      const intensity = humanRacketVelocityY * 6; // Slightly increased intensity multiplier
      this.ball.body.setVelocity(
        horizontalVelocity,
        verticalVelocity - intensity
      );
    }

    if (this.physics.overlap(this.ball, this.computerRacket)) {
      const distanceFromNet = Math.abs(
        this.ball.x - this.sys.game.canvas.width / 2
      );
      const maxDistance = this.sys.game.canvas.width / 2;

      const horizontalVelocity = -200 - 250 * (distanceFromNet / maxDistance);
      const verticalVelocity = -250 - 150 * (distanceFromNet / maxDistance);

      this.ball.body.setVelocity(horizontalVelocity, verticalVelocity);
    }

    // Check if the ball goes out of bounds (reset game state)
    if (this.ball.x < 0 || this.ball.x > this.sys.game.canvas.width) {
      this.resetGame();
    }
  }

  resetGame() {
    this.ball.setPosition(
      this.sys.game.canvas.width / 2 - 250,
      this.sys.game.canvas.height / 2
    ); // Reset ball to starting position
    this.ball.body.setVelocity(0, 0); // Stop ball
    this.isGameStarted = false; // Pause game
    this.startButton.setVisible(true); // Show the start button
  }
}
