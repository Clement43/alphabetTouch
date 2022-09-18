
import {drawSprite} from "./sprites.js";
const gameBoard = document.getElementById('gameBoard')
gameBoard.width = window.innerWidth * 0.7;
gameBoard.height = window.innerHeight * 0.9;
document.getElementById('addLetter').addEventListener('click', addLetter)
const ctx = gameBoard.getContext("2d");
let letters = []

drawGame()
onload = () => {
    gameBoard.width = window.innerWidth * 0.7;
    gameBoard.height = window.innerHeight * 0.9;
}
onresize = (event) => {
    gameBoard.width = window.innerWidth * 0.7;
    gameBoard.height = window.innerHeight * 0.9;
};

onkeyup = (event) => {
    letters = letters.filter(letter => {
        if (letter.name !== event.key.toUpperCase()) {
            ctx.fillText('dead', 100, 100);
            return true
        }
    })
}
function start() {
    setTimeout(function() {
        addLetter()
        start();
    }, 1000);
}
start();

 async function testTimeout() {
    setTimeout(function() {
    }, 1000);
}



function addLetter() {
    let  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
   const randomLetter = characters.charAt(Math.floor(Math.random() * characters.length))
    let spawn = Math.floor(Math.random() * 4)
    let spawnPossibility = [
        {
            x: Math.floor(Math.random() * gameBoard.width),
            y: gameBoard.height
        },
        {
            x: Math.floor(Math.random() * gameBoard.width),
            y: 0
        },
        {
            x: gameBoard.width,
            y: Math.floor(Math.random() * gameBoard.height)
        },
        {
            x: 0,
            y: Math.floor(Math.random() * gameBoard.height)
        },
    ]

    let ptsX = spawnPossibility[spawn].x
    let ptsY = spawnPossibility[spawn].y

    letters.push(
        {
            name: randomLetter,
            x: ptsX,
            y: ptsY,
            vx: ((ptsX - (gameBoard.width / 2)) * -1) / 200,
            vy: ((ptsY - (gameBoard.height / 2)) * -1) / 200,
        },)
}


function drawGame() {
    let radius = 40
    ctx.clearRect(0, 0, gameBoard.width, gameBoard.height);

    drawSprite()
    drawMiddle(radius)
    letters.forEach((letter, key) => {
        ctx.font = '25px serif';
        ctx.fillText(letter.name, letter.x, letter.y);
        if (
            (letter.x >= gameBoard.width/2 - radius &&  letter.y >= gameBoard.height/2 - radius) &&
            (letter.x >= gameBoard.width/2 - radius &&  letter.y <= gameBoard.height/2 + radius) &&
            (letter.x <= gameBoard.width/2 + radius &&  letter.y <= gameBoard.height/2 + radius) &&
            (letter.x <= gameBoard.width/2 + radius &&  letter.y >= gameBoard.height/2 - radius)
        ){
            letters.splice(key,1)
        }
        letter.x += letter.vx;
        letter.y += letter.vy;

    })

    window.requestAnimationFrame(drawGame);
}

function drawMiddle(radius) {
    ctx.beginPath();
    ctx.fillStyle = 'green';
    ctx.arc(gameBoard.width / 2, gameBoard.height / 2, radius, 0, Math.PI * 2, true);
    ctx.fill()
    ctx.fillStyle = 'black';
    ctx.font = '15px serif';
    ctx.fillText('middle', gameBoard.width / 2, gameBoard.height / 2);
}

