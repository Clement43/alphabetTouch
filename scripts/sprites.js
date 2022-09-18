let myImage = new Image();
myImage.src = "../images/sprites/explosion.png";
const gameBoard = document.getElementById('gameBoard')
const ctx = gameBoard.getContext("2d");
let shift = 0;
let shiftHeight = 0
let frameWidth = 0;
let frameHeight = 0;
let totalFrames = 4;
let totalHeight = 4
let currentFrame = 0;
let currentHeightFrame = 0
let fps = 0
frameWidth = myImage.width / 5
frameHeight = myImage.height / 3

export function drawSprite() {

    fps ++
    if (fps === 2){
        currentFrame++;
        shift += frameWidth;
        fps = 0
    }
            ctx.drawImage(myImage, shift, shiftHeight, frameWidth, frameHeight,
                120, 25, frameWidth, frameHeight);
            if (currentFrame === totalFrames) {
                shift = 0;
                shiftHeight += frameHeight
                if (currentHeightFrame === totalHeight) {
                    currentHeightFrame = 0
                    shiftHeight = 0
                }
                currentHeightFrame++
                currentFrame = 0;
            }
}