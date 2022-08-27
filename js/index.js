const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

var keyUp;
var keyDown;
var keyLeft;
var keyRight;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

console.log(canvas.width);

class Block {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
}

class Player extends Block {
    constructor(x, y, width, height, color) {
        super(x, y, width, height, color);
        this.xspeed = 0;
        this.yspeed = 0;
        this.maxspeed = 2;
        this.active = true;
    }
    
    

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x , this.y, this.width, this.height);
        ctx.fill();
    }

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

            if (detectCollision(player, blocks)) {
                this.maxspeed = 0;
            } else {
                console.log('eeee')
            }
        }

        this.draw();
        this.x += this.xspeed;
        this.y += this.yspeed;
    }

}

class Maze extends Block {
    constructor(x, y, width, height, color) {
        super(x, y, width, height, color);
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fill();
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].draw();
    }
    player.step();
    
}

function detectCollision(player, blocks) {
    for (let i = 0; i < blocks.length; i++) {
        if (player.x <= blocks[i].x + blocks[i].width &&
            player.x + player.width >= blocks[i].x &&
            player.y <= blocks[i].y + blocks[i].height &&
            player.y + player.height >= blocks[i].y) {
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

const player = new Player(canvas.width / 2, canvas.height / 2, 15, 15, 'red');

var blocks = [
    new Maze(canvas.width / 2 - 500, canvas.height / 2 + 50, 1000, 500, 'black'),
    new Maze(canvas.width / 2 - 500, canvas.height / 2 + 50, 1000, 500, 'blue'),
    new Maze(canvas.width / 2 + 500, canvas.height / 2 - 500, 500, 2000, 'red'),
    new Maze(canvas.width / 2 - 500, canvas.height / 2 + 300, 1000, 200, 'yellow'),
    
];

setupInputs();
animate();