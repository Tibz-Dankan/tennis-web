import { Scene } from "phaser";

export class Game extends Scene {
  constructor() {
    super("Game");
    this.isGameStarted = false;

    // Initialize scores
    this.humanScore = 0;
    this.computerScore = 0;

    // Track the last player to hit the ball
    this.lastHitter = null;
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

    this.humanRacket = this.add
      .image(centerX - 300, centerY, "racket-blue")
      .setOrigin(0.5)
      .setDisplaySize(32, 80);

    this.computerRacket = this.add
      .image(centerX + 300, centerY, "racket-red")
      .setOrigin(0.5)
      .setDisplaySize(32, 80);

    this.ball = this.add
      .image(centerX - 250, centerY, "ball")
      .setOrigin(0.5)
      .setDisplaySize(24, 24);

    this.physics.world.enable([
      this.ball,
      this.humanRacket,
      this.computerRacket,
    ]);

    this.ball.body.setGravityY(500);

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
    this.ball.setPosition(this.humanRacket.x + 50, this.humanRacket.y);
    this.ball.body.setVelocity(120, -220);
    this.lastHitter = "human"; // Human starts with the serve
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

    const maxSpeed = 6;
    const ballDirectionX = this.ball.x - this.computerRacket.x;
    const direction = Math.sign(ballDirectionX);

    if (Math.abs(ballDirectionX) > maxSpeed) {
      this.computerRacket.x += maxSpeed * direction;
    } else {
      this.computerRacket.x += ballDirectionX;
    }

    this.computerRacket.x = Phaser.Math.Clamp(
      this.computerRacket.x,
      this.sys.game.canvas.width / 2 + 50,
      this.sys.game.canvas.width - 50
    );

    // Handle collision with human racket
    if (this.physics.overlap(this.ball, this.humanRacket)) {
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

    // Handle collision with computer racket
    if (this.physics.overlap(this.ball, this.computerRacket)) {
      const distanceFromNet = Math.abs(
        this.ball.x - this.sys.game.canvas.width / 2
      );
      const maxDistance = this.sys.game.canvas.width / 2;

      const horizontalVelocity = -200 - 250 * (distanceFromNet / maxDistance);
      const verticalVelocity = -250 - 150 * (distanceFromNet / maxDistance);

      this.ball.body.setVelocity(horizontalVelocity, verticalVelocity);

      this.lastHitter = "computer"; // Update last hitter
    }

    // Ball hits the post (award point to the opponent)
    if (this.physics.overlap(this.ball, this.post)) {
      this.handlePostCollision();
    }

    // Ball falls into player's own boundary (award point to the opponent)
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

    // Ball out of bounds horizontally (award point to the last hitter)
    if (this.ball.x < 0 || this.ball.x > this.sys.game.canvas.width) {
      this.handleOutOfBounds();
    }
  }

  // Function to handle when the ball falls into the player's own boundary
  handleOwnBoundaryHit() {
    // Award point to the opponent (last hitter's opponent)
    if (this.lastHitter === "human") {
      this.computerScore++;
    } else if (this.lastHitter === "computer") {
      this.humanScore++;
    }

    // Update score display
    this.humanScoreText.setText(`Player: ${this.humanScore}`);
    this.computerScoreText.setText(`Computer: ${this.computerScore}`);

    // Reset game state
    this.resetGame();
  }

  handlePostCollision() {
    // Award point to the opponent (the player who did not hit the ball last)
    if (this.lastHitter === "human") {
      this.computerScore++; // Opponent (computer) gets the point
    } else if (this.lastHitter === "computer") {
      this.humanScore++; // Opponent (human) gets the point
    }

    // Update score display
    this.humanScoreText.setText(`Player: ${this.humanScore}`);
    this.computerScoreText.setText(`Computer: ${this.computerScore}`);

    // Reset game state
    this.resetGame();
  }

  handleOutOfBounds() {
    // Award point to the last hitter (the player who hit the ball last)
    if (this.lastHitter === "human") {
      this.humanScore++; // Player gets the point
    } else if (this.lastHitter === "computer") {
      this.computerScore++; // Computer gets the point
    }

    // Update score display
    this.humanScoreText.setText(`Player: ${this.humanScore}`);
    this.computerScoreText.setText(`Computer: ${this.computerScore}`);

    // Reset game state
    this.resetGame();
  }

  resetGame() {
    this.ball.setPosition(
      this.sys.game.canvas.width / 2 - 250,
      this.sys.game.canvas.height / 2
    );
    this.ball.body.setVelocity(0, 0);
    this.isGameStarted = false;
    this.startButton.setVisible(true);
  }
}
