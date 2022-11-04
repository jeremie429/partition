let gameOver = false;

export class InputHandler {
  constructor(game) {
    this.game = game;
    window.addEventListener("keydown", (e) => {
      const keyPressed = e.key;

      if (
        (keyPressed === "ArrowUp" || keyPressed === "ArrowDown") &&
        this.game.keys.indexOf(keyPressed) === -1
      ) {
        this.game.keys.push(keyPressed);
      } else if (keyPressed === " ") {
        this.game.player.shootTop();
      } else if (keyPressed === "d") {
        //console.log(keyPressed);
        this.game.debug = !this.game.debug;
      }
    });

    window.addEventListener("keyup", (e) => {
      if (this.game.keys.indexOf(e.key) > -1) {
        this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
      }
    });
  }
}

export class Projectile {
  constructor(game, x, y) {
    this.game = game;

    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 3;
    this.speed = 10;
    this.markedForDeletion = false;
    this.image = document.getElementById("projectile");
  }
  update() {
    this.x += this.speed;
    if (this.x > this.game.width * 0.8) this.markedForDeletion = true;
  }

  draw(context) {
    /* context.fillStyle = "green";
      context.fillRect(this.x, this.y, this.width, this.height);*/
    context.drawImage(this.image, this.x, this.y);
  }
}

export class Particle {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.image = document.getElementById("gears");
    this.frameY = Math.floor(Math.random() * 3);
    this.frameX = Math.floor(Math.random() * 3);
    this.spriteSize = 50;
    this.sizeModifier = (Math.random() * 0.5 + 0.5).toFixed(1);
    this.size = this.spriteSize * this.sizeModifier;
    this.speedX = Math.random() * 6 - 3;
    this.speedY = Math.random() * -15;
    this.gravity = 0.5;
    this.markedForDeletion = false;
    this.angle = 0;
    this.va = Math.random() * 0.2 - 0.1;
  }

  update() {
    this.angle += this.va;
    this.speedY += this.gravity;
    this.x -= this.speedX;
    this.y += this.speedY;

    if (this.y > this.game.height + this.size || this.x < 0 - this.size)
      this.markedForDeletion = true;
  }

  draw(context) {
    context.drawImage(
      this.image,
      this.frameX * this.spriteSize,
      this.frameX * this.spriteSize,
      this.spriteSize,
      this.spriteSize,
      this.x,
      this.y,
      this.size,
      this.size
    );
  }
}

export class Player {
  constructor(game) {
    this.game = game;
    this.width = 120;
    this.height = 190;
    this.x = 20;
    this.y = 100;
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 37;
    this.speedY = 0;
    this.image = document.getElementById("player");
    this.powerUp = false;
    this.powerUpTimer = 0;
    this.powerUpLimit = 10000;
    this.projectiles = [];
    this.lives = 3;
  }

  update(deltaTime) {
    if (this.game.keys.includes("ArrowUp")) this.speedY = -3;
    else if (this.game.keys.includes("ArrowDown")) this.speedY = 3;
    else this.speedY = 0;

    this.y += this.speedY;
    if (this.y > this.game.height - this.height * 0.5) {
      this.y = this.game.height - this.height * 0.5;
    } else if (this.y < -this.height * 0.5) {
      this.y = -this.height * 0.5;
    }

    this.projectiles.forEach((projectile) => projectile.update());
    this.projectiles = this.projectiles.filter(
      (projectile) => !projectile.markedForDeletion
    );

    if (this.frameX < this.maxFrame) {
      this.frameX++;
    } else {
      this.frameX = 0;
    }

    if (this.powerUp) {
      if (this.powerUpTimer > this.powerUpLimit) {
        this.powerUpTimer = 0;
        this.powerUp = false;
        this.frameY = 0;
      } else {
        this.powerUpTimer += deltaTime;
        this.frameY = 1;
        this.game.amo += 0.1;
      }
    }
  }

  draw(context) {
    //context.fillStyle = "black";
    if (this.game.debug)
      context.strokeRect(this.x, this.y, this.width, this.height);

    this.projectiles.forEach((projectile) => {
      projectile.draw(context);
    });
    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  shootTop() {
    if (this.game.amo > 0) {
      this.projectiles.push(
        new Projectile(this.game, this.x + 80, this.y + 30)
      );
      this.game.amo--;
    }
    if (this.powerUp) this.shootBottom();
  }

  shootBottom() {
    if (this.game.amo > 0) {
      this.projectiles.push(
        new Projectile(this.game, this.x + 80, this.y + 175)
      );
    }
  }

  enterPowerUp() {
    this.powerUpTimer = 0;
    this.powerUp = true;
    this.game.amo = this.game.maxAmo;
  }
}

export class Enemy {
  constructor(game) {
    this.game = game;
    this.x = this.game.width;
    this.speedX = Math.random() * -1.5 - 0.5;
    this.markedForDeletion = false;
    // this.width = 80
    // this.height = 40

    //this.lives = 5;
    //this.score = this.lives;
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 37;
  }

  update() {
    this.x += this.speedX - this.game.speed;
    if (this.x + this.width < 0) this.markedForDeletion = true;
    if (this.frameX < this.maxFrame) {
      this.frameX++;
    } else {
      this.frameX = 0;
    }
  }

  draw(context) {
    //context.fillStyle = "red";
    if (this.game.debug)
      context.strokeRect(this.x, this.y, this.width, this.height);
    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
    context.fillStyle = "black";
    context.font = "20px Helvetica";
    context.fillText(
      this.lives,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y - 5
    );
  }
}

export class Angler1 extends Enemy {
  constructor(game) {
    super(game);
    this.width = 228;

    this.height = 169;
    this.y = Math.random() * this.game.height * 0.9 - this.height;
    this.image = document.getElementById("angler1");
    this.frameY = Math.floor(Math.random() * 3);

    this.lives = 3;
    this.score = this.lives;
  }
}

export class Angler2 extends Enemy {
  constructor(game) {
    super(game);
    this.width = 213;

    this.height = 165;
    this.y = Math.random() * this.game.height * 0.9 - this.height;
    this.image = document.getElementById("angler2");
    this.frameY = Math.floor(Math.random() * 2);
    this.lives = 2;
    this.score = this.lives;
  }
}

export class LuckyFish extends Enemy {
  constructor(game) {
    super(game);
    this.width = 99;

    this.height = 95;
    this.y = Math.random() * this.game.height * 0.9 - this.height;
    this.image = document.getElementById("lucky");
    this.frameY = Math.floor(Math.random() * 3);

    this.lives = 3;
    this.score = 15;

    this.type = "lucky";
  }
}

export class Layer {
  constructor(game, image, speedModifier) {
    this.game = game;
    this.image = image;
    this.speedModifier = speedModifier;
    this.width = 1768;
    this.height = 500;
    this.x = 0;
    this.y = 0;
  }

  update() {
    if (this.x > this.width) this.x = 0;
    this.x -= this.game.speed * this.speedModifier;
  }

  draw(context) {
    context.drawImage(this.image, this.x, this.y);
    context.drawImage(this.image, this.x + this.width, this.y);
  }
}

export class Background {
  constructor(game) {
    this.game = game;
    this.img1 = document.getElementById("layer1");
    this.img2 = document.getElementById("layer2");
    this.img3 = document.getElementById("layer3");
    this.img4 = document.getElementById("layer4");
    this.layer1 = new Layer(game, this.img1, 0.2);
    this.layer2 = new Layer(game, this.img2, 0.4);
    this.layer3 = new Layer(game, this.img3, 1);
    this.layer4 = new Layer(game, this.img4, 1.5);
    this.layers = [this.layer1, this.layer2, this.layer3];
  }

  update() {
    this.layers.forEach((layer) => layer.update());
  }

  draw(context) {
    this.layers.forEach((layer) => layer.draw(context));
  }
}

export class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 25;
    this.fontFamily = "Bangers";
    this.color = "white";
  }

  draw(context) {
    //score
    context.save();
    context.fillStyle = this.color;
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = "black";
    context.font = this.fontSize + "px " + this.fontFamily;
    context.fillText("Score: " + this.game.score, 20, 40);
    context.fillText("Lives: " + this.game.player.lives, 20, 130);
    //context.fillStyle = this.color;
    if (this.game.player.powerUp) context.fillStyle = "#ffffbd";
    for (let i = 0; i < this.game.amo; i++) {
      context.fillRect(20 + 5 * i, 50, 3, 20);
    }

    const formattedTime = (this.game.gameTime * 0.001).toFixed(1);
    context.fillText("Timer: " + formattedTime, 20, 100);

    if (this.game.gameOver) {
      context.textAlign = "center";
      let message1;
      let message2;

      if (this.game.score >= this.game.winningScore) {
        message1 = "You Win!!!";
        message2 = "Well Done!";
      } else {
        message1 = "You Lost";
        message2 = "Try again next time!";
      }

      context.font = "50px " + this.fontFamily;
      context.fillText(
        message1,
        this.game.width * 0.5,
        this.game.height * 0.5 - 20
      );
      context.font = "30px " + this.fontFamily;
      context.fillText(
        message2,
        this.game.width * 0.5,
        this.game.height * 0.5 + 20
      );
    }

    context.restore();
  }
}

export class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.player = new Player(this);
    this.input = new InputHandler(this);
    this.ui = new UI(this);
    this.amo = 20;
    this.maxAmo = 50;
    this.amoTimer = 0;
    this.amoInterval = 500;
    this.background = new Background(this);
    this.enemyTimer = 0;
    this.enemyInterval = 1000;
    this.debug = false;
    this.particles = [];
    this.keys = [];
    this.enemies = [];

    this.gameOver = false;
    this.score = 0;
    this.winningScore = 500;
    this.gameTime = 0;
    this.timeLimit = 50000;
    this.bonusLiveToReach = 50;

    this.speed = 1;
  }

  update(deltaTime) {
    if (!this.gameOver) this.gameTime += deltaTime;
    // if (this.gameTime > this.timeLimit) this.gameOver = true;
    if (this.gameOver) return;
    this.background.update();
    this.background.layer4.update();
    this.player.update(deltaTime);

    if (this.amoTimer > this.amoInterval) {
      if (this.amo < this.maxAmo) this.amo++;
      this.amoTimer = 0;
      //console.log(this.amoTimer);
    } else {
      this.amoTimer += deltaTime;
    }

    this.enemies.forEach((enemy) => {
      enemy.update();
      if (this.checkCollision(this.player, enemy)) {
        enemy.markedForDeletion = true;
        for (let i = 0; i < 10; i++) {
          this.particles.push(
            new Particle(
              this,
              enemy.x + enemy.width * 0.5,
              enemy.y + enemy.height * 0.5
            )
          );
        }
        if (enemy.type === "lucky") {
          this.player.enterPowerUp();
        } else {
          this.score -= enemy.lives;

          this.player.lives -= 1;
        }
      }

      this.player.projectiles.forEach((projectile) => {
        if (this.checkCollision(projectile, enemy)) {
          enemy.lives--;
          projectile.markedForDeletion = true;
          if (enemy.lives <= 0) {
            enemy.markedForDeletion = true;

            this.particles.push(
              new Particle(
                this,
                enemy.x + enemy.width * 0.5,
                enemy.y + enemy.height * 0.5
              )
            );

            if (!this.gameOver) this.score += enemy.score;
            /* if (this.score > this.winningScore) {
              this.gameOver = true;
            }*/
          }
        }
      });
    });

    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);

    if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
      //if (this.amo < this.maxAmo) this.amo++;

      this.addEnemy();
      this.enemyTimer = 0;
      //console.log(this.enemyTimer);
    } else {
      this.enemyTimer += deltaTime;
    }

    this.particles.forEach((particle) => particle.update());

    this.particles = this.particles.filter(
      (particle) => !particle.markedForDeletion
    );
    // console.log({ numRounded: Math.round(this.score / this.bonusLiveToReach) });

    if (Math.floor(this.score / this.bonusLiveToReach) > 0) {
      //console.log(this.bonusLiveToReach);
      this.bonusLiveToReach += 50;
      this.player.lives++;
    }

    if (this.player.lives <= 0) {
      this.gameOver = true;
    }

    gameOver = this.gameOver;
  }

  draw(context) {
    if (this.gameOver) return;
    this.background.draw(context);
    this.player.draw(context);
    this.ui.draw(context);
    this.enemies.forEach((enemy) => {
      enemy.draw(context);
    });
    this.background.layer4.draw(context);

    this.particles.forEach((particle) => particle.draw(context));
  }

  addEnemy() {
    const randomize = Math.random();

    if (randomize < 0.3) this.enemies.push(new Angler1(this));
    else if (randomize < 0.6) this.enemies.push(new Angler2(this));
    else this.enemies.push(new LuckyFish(this));
  }

  checkCollision(rect1, rect2) {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.height + rect1.y > rect2.y
    );
  }
}

export { gameOver };
