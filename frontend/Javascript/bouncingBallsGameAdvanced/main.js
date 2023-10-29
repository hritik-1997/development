// set up canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random RGB color value

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    if (this.x + this.size >= width) {
      this.velX = -Math.abs(this.velX);
    }

    if (this.x - this.size <= 0) {
      this.velX = Math.abs(this.velX);
    }

    if (this.y + this.size >= height) {
      this.velY = -Math.abs(this.velY);
    }

    if (this.y - this.size <= 0) {
      this.velY = Math.abs(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    if (this.isColliding(blackHole)) {
      balls = balls.filter((ball) => {
        return ball != this;
      });
    } else {
      for (const ball of balls) {
        if (!(this === ball) && this.isColliding(ball)) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
  isColliding(ball1) {
    const dx = this.x - ball1.x;
    const dy = this.y - ball1.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < this.size + ball1.size) {
      return true;
    } else {
      return false;
    }
  }
}

let balls = [];

while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );

  balls.push(ball);
}
let blackHole = new Ball(width / 2, height / 2, 17, 13, "rgb(255,255,255)", 10);

function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, width, height);
  blackHole.draw();
  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect();
  }

  requestAnimationFrame(loop);
}

loop();
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      blackHole.x -= blackHole.velX;
      break;
    case "ArrowRight":
      blackHole.x += blackHole.velX;
      break;
    case "ArrowUp":
      blackHole.y -= blackHole.velY;
      break;
    case "ArrowDown":
      blackHole.y += blackHole.velY;
      break;
  }
});
