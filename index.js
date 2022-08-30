const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const startGameBtn = document.querySelector('#startGameBtn');
const modelEl = document.querySelector('#modelEl');
const image = document.querySelector('#image');

const music = new Audio('Sigma Rule Song.mp3');

let goalCollision = false; 
let randomTime = Math.floor(Math.random() * 12);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var keyUp;
var keyDown;
var keyLeft;
var keyRight;

//Parent class for Player subclass
class Block {
    constructor(x, y, width, height, color, type) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.type = type;
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
        this.alive = true;
    }

    //For player movement on both WASD and Arrows
    step() {
        if (this.active) {
            if (!keyLeft && !keyRight || keyLeft && keyRight) {
                this.xspeed = 0;
            } else if (keyRight) {
                this.xspeed ++;

                if (this.xspeed >= this.maxspeed) {
                    this.xspeed = this.maxspeed;
                }
            } else if (keyLeft) {
                this.xspeed --;
                if (this.xspeed <= -this.maxspeed) {
                    this.xspeed = -this.maxspeed;
                }
            }

            if (!keyUp && !keyDown || keyUp && keyDown) {
                this.yspeed = 0;
            } else if (keyUp) {
                this.yspeed --;

                if (this.yspeed <= -this.maxspeed) {
                    this.yspeed = -this.maxspeed;
                }
            } else if (keyDown) {
                this.yspeed ++;
                if (this.yspeed >= this.maxspeed) {
                    this.yspeed = this.maxspeed;
                }
            }

            spooky();

            if (goalCollision == false) {
                if (detectCollision(player, level)) {
                    cancelAnimationFrame(animationId);
                    this.alive = false;
                    startGameBtn.textContent = 'Retry?'
                    modelEl.style.display = 'flex';
                    num = 0;
                } 
            } else {
                if (detectCollision(player, level2)) {
                    cancelAnimationFrame(animationId);
                    this.alive = false;
                    startGameBtn.textContent = 'Retry?'
                    modelEl.style.display = 'flex';
                    num = 0;
                } 
            }
        }

        this.draw();
        this.x += this.xspeed;
        this.y += this.yspeed;
    }
}

//Detects a collision between the player and the level blocks
function detectCollision(player, lvl) {
    for (let i = 0; i < lvl.length; i++) {
        if (player.x <= lvl[i].x + lvl[i].width &&
            player.x + player.width >= lvl[i].x &&
            player.y <= lvl[i].y + lvl[i].height &&
            player.y + player.height >= lvl[i].y) {
                if (lvl[i].type == true) {
                    goalCollision = true;
                } else {
                    return true;
                }
            }
    }
}

function spooky() {
    if (player.y <= canvas.height / 2 - 100) {
        setTimeout( function() { getSpook(); }, randomTime * 1000)
        console.log(randomTime)
    }
}

function getSpook() {
    if (player.alive) {
        image.style.display = 'flex';
        music.play();
    } else {
        return;
    } 
}

//Loop to draw function for both the level blocks and player
let animationId;
function animate() {
    animationId = requestAnimationFrame(animate);
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (goalCollision) {
        for (let i = 0; i < level2.length; i++) {
            level2[i].draw();
            teleport();
        }
    } else {
        for (let i = 0; i < level.length; i++) {
            level[i].draw();
        }
    }

    player.step();
    console.log(player.y);
    console.log(canvas.height / 2)
}

let num = 0;
function teleport() {
    if (num >= 1) {
        return;
    } else {
        player.x = canvas.width / 2 - 475;
        player.y = canvas.height / 2 + 255;
        num++;
    }
}

//Returns a boolean regarding which buttons WASD/ Arrow keys are being pressed
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

let player = new Player(canvas.width / 2 - 475, canvas.height / 2 + 255, 10, 10, 'red');

function init() {
    player = new Player(canvas.width / 2 - 475, canvas.height / 2 - 75, 10, 10, 'red');
    goalCollision = false;
}

const level = [
    new Block(canvas.width / 2 - 1000, canvas.height / 2 - 500, 500, 1000, 'black', false),
    new Block(canvas.width / 2 - 500, canvas.height / 2 - 500, 1000, 200, 'black', false),
    new Block(canvas.width / 2 + 500, canvas.height / 2 - 500, 500, 1000, 'black', false),
    new Block(canvas.width / 2 - 500, canvas.height / 2 + 300, 1000, 200, 'black', false),
    new Block(canvas.width / 2 - 500, canvas.height / 2 - 395, 1000, 300, 'black', false),
    new Block(canvas.width / 2 - 500, canvas.height / 2 - 40, 500, 500, 'black', false),
    new Block(canvas.width / 2 - 500, canvas.height / 2 - 40, 950, 50, 'black', false),
    new Block(canvas.width / 2 + 400, canvas.height / 2 - 40, 50, 280, 'black', false),
    new Block(canvas.width / 2 + 60, canvas.height / 2 + 190, 350, 50, 'black', false),
    new Block(canvas.width / 2 + 60, canvas.height / 2 + 60, 50, 150, 'black', false),
    new Block(canvas.width / 2 + 60, canvas.height / 2 + 60, 310, 50, 'black', false),
    new Block(canvas.width / 2 + 155, canvas.height / 2 + 60, 215, 112, 'black', false),
    new Block(canvas.width / 2 + 125, canvas.height / 2 + 132, 50, 40, 'black', false),
    new Block(canvas.width / 2 + 135, canvas.height / 2 + 70, 220, 90, 'red', true)
];

const level2 = [
    new Block(canvas.width / 2 - 1000, canvas.height / 2 - 500, 500, 1000, 'black', false),
    new Block(canvas.width / 2 - 500, canvas.height / 2 - 500, 1000, 200, 'black', false),
    new Block(canvas.width / 2 + 500, canvas.height / 2 - 500, 500, 1000, 'black', false),
    new Block(canvas.width / 2 - 500, canvas.height / 2 + 300, 1000, 200, 'black', false),
    new Block(canvas.width / 2 - 500, canvas.height / 2 + 175, 950, 50, 'black', false),
    new Block(canvas.width / 2 - 450, canvas.height / 2 - 75, 1000, 200, 'black', false),
    new Block(canvas.width / 2 + 50, canvas.height / 2 - 310, 900, 250, 'black', false),
    new Block(canvas.width / 2 - 500, canvas.height / 2 - 315, 500, 205, 'black', false),
    new Block(canvas.width / 2 - 465, canvas.height / 2 - 185, 500, 75, 'black', false),
    new Block(canvas.width / 2 + 15, canvas.height / 2 - 230, 50, 30, 'black', false),
    new Block(canvas.width / 2 - 25, canvas.height / 2 - 260, 50, 15, 'black', false),
    new Block(canvas.width / 2 + 40, canvas.height / 2 - 260, 50, 35, 'black', false),
    new Block(canvas.width / 2 + 30, canvas.height / 2 - 95, 50, 35, 'black', false),
    new Block(canvas.width / 2, canvas.height / 2 - 359, 75, 100, 'red', true),
];

image.style.display = 'none';
startGameBtn.addEventListener('click', () => {
    init();
    setupInputs();
    animate();
    modelEl.style.display = 'none';
})