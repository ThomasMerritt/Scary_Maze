const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var keyUp;
var keyDown;
var keyLeft;
var keyRight;

//Parent class for Player subclass
class Block {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fill();
    }
}

//Extension of Block with added velocity
class Player extends Block {
    constructor(x, y, width, height, color) {
        super(x, y, width, height, color);
        this.xspeed = 0;
        this.yspeed = 0;
        this.maxspeed = 2;
        this.active = true;
    }

    //For player movement on both WASD and Arrows
    step() {
        if (this.active) {
            if (!keyLeft && !keyRight || keyLeft && keyRight) {
                this.xspeed = 0;
            } else if (keyRight) {
                console.log('right')
                this.xspeed ++;

                if (this.xspeed >= this.maxspeed) {
                    this.xspeed = this.maxspeed;
                }
            } else if (keyLeft) {
                console.log('left')
                this.xspeed --;
                if (this.xspeed <= -this.maxspeed) {
                    this.xspeed = -this.maxspeed;
                }
            }

            if (!keyUp && !keyDown || keyUp && keyDown) {
                this.yspeed = 0;
            } else if (keyUp) {
                console.log('up')
                this.yspeed --;

                if (this.yspeed <= -this.maxspeed) {
                    this.yspeed = -this.maxspeed;
                }
            } else if (keyDown) {
                console.log('down')
                this.yspeed ++;
                if (this.yspeed >= this.maxspeed) {
                    this.yspeed = this.maxspeed;
                }
            }

            if (detectCollision(player, level)) {
                this.maxspeed = 0;
            }
        }

        this.draw();
        this.x += this.xspeed;
        this.y += this.yspeed;
    }

}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < level.length; i++) {
        level[i].draw();
    }
    player.step();
    
}

function detectCollision(player, level) {
    for (let i = 0; i < level.length; i++) {
        if (player.x <= level[i].x + level[i].width &&
            player.x + player.width >= level[i].x &&
            player.y <= level[i].y + level[i].height &&
            player.y + player.height >= level[i].y) {
                return true;
            }
    }
}

function setupInputs() {
    document.addEventListener('keydown', function(event) {
        if (event.key == 'w' || event.key == 'ArrowUp') {
            keyUp = true;
        } else if (event.key == 's' || event.key == 'ArrowDown') {
            keyDown = true;
        } else if (event.key == 'a' || event.key == 'ArrowLeft') {
            keyLeft = true;
        } else if (event.key == 'd' || event.key == 'ArrowRight') {
            keyRight = true;
        }
    })

    document.addEventListener('keyup', function(event) {
        if (event.key == 'w' || event.key == 'ArrowUp') {
            keyUp = false;
        } else if (event.key == 's' || event.key == 'ArrowDown') {
            keyDown = false;
        } else if (event.key == 'a' || event.key == 'ArrowLeft') {
            keyLeft = false;
        } else if (event.key == 'd' || event.key == 'ArrowRight') {
            keyRight = false;
        }
    })
}

const player = new Player(canvas.width / 2 - 475, canvas.height / 2 + 255, 10, 10, 'red');

var level = [
    new Block(canvas.width / 2 - 1000, canvas.height / 2 - 500, 500, 1000, 'black'),
    new Block(canvas.width / 2 - 500, canvas.height / 2 - 500, 1000, 200, 'black'),
    new Block(canvas.width / 2 + 500, canvas.height / 2 - 500, 500, 1000, 'black'),
    new Block(canvas.width / 2 - 500, canvas.height / 2 + 300, 1000, 200, 'black'),
    new Block(canvas.width / 2 - 500, canvas.height / 2 + 175, 950, 50, 'black'),
    new Block(canvas.width / 2 - 450, canvas.height / 2 - 75, 1000, 200, 'black'),
    new Block(canvas.width / 2 + 50, canvas.height / 2 - 310, 1000, 250, 'black'),
    new Block(canvas.width / 2 - 500, canvas.height / 2 - 315, 500, 205, 'black'),
    new Block(canvas.width / 2 - 465, canvas.height / 2 - 185, 500, 75, 'black'),
    new Block(canvas.width / 2 + 15, canvas.height / 2 - 230, 50, 30, 'black'),
    new Block(canvas.width / 2 - 25, canvas.height / 2 - 260, 50, 15, 'black'),
    new Block(canvas.width / 2 + 40, canvas.height / 2 - 260, 50, 35, 'black'),
    new Block(canvas.width / 2 + 30, canvas.height / 2 - 95, 50, 35, 'black')
    
];

setupInputs();
animate();