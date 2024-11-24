import { Scene } from "phaser";

export class Game extends Scene {
  constructor() {
    super("Game");
    this.isGameStarted = false;
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

    this.add.image(centerX, topY, "post").setOrigin(0.5);

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
  }

  startGame() {
    this.startButton.setVisible(false);
    this.isGameStarted = true;

    this.ball.setPosition(this.humanRacket.x + 50, this.humanRacket.y);
    this.ball.body.setVelocity(120, -220);
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

    if (this.physics.overlap(this.ball, this.humanRacket)) {
      this.hitBall(this.humanRacket, this.computerRacket, humanRacketVelocityY);
    }

    if (this.physics.overlap(this.ball, this.computerRacket)) {
      this.hitBall(this.computerRacket, this.humanRacket, 0);
    }

    if (this.ball.x < 0 || this.ball.x > this.sys.game.canvas.width) {
      this.resetGame();
    }
  }

  hitBall(hittingRacket, opponentRacket, racketVelocityY) {
    const { width, height } = this.sys.game.canvas;

    // Set target position in the opponent's section
    const targetX =
      hittingRacket.x < width / 2
        ? Phaser.Math.Clamp(width - 100, width / 2 + 50, width - 50) // Opponent's side
        : Phaser.Math.Clamp(100, 50, width / 2 - 50);

    const targetY = opponentRacket.y > height / 2 ? 50 : height - 50; // Furthest vertical position

    // Calculate trajectory to the target
    const dx = targetX - this.ball.x;
    const dy = targetY - this.ball.y;

    const speed = 500; // Ball speed
    const angle = Math.atan2(dy, dx);

    let velocityX = Math.cos(angle) * speed;
    let velocityY = Math.sin(angle) * speed;

    // Ensure the ball moves upward after a hit
    if (hittingRacket === this.humanRacket && velocityY > 0) {
      velocityY = -Math.abs(velocityY);
    } else if (hittingRacket === this.computerRacket && velocityY < 0) {
      velocityY = Math.abs(velocityY);
    }

    // Slight adjustment from racket movement
    velocityY -= racketVelocityY * 2;

    this.ball.body.setVelocity(velocityX, velocityY);
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
