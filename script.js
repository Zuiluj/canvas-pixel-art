const colorpicker = document.getElementById("colorpicker");
const sizepicker = document.getElementById("sizepicker");
const boardsizepicker = document.getElementById("boardsizepicker");
const canvas = document.getElementById("board");
const saveBtn = document.getElementById("saveButton");
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = 8;
const CANVAS_HEIGHT = 8;

const tempCanvas = document.createElement("canvas");
const tempCtx = tempCanvas.getContext('2d');

let scale = 10;
let color = colorpicker.value;
let size = sizepicker.value * scale;
let isPressed = false;
let currentX = 0; 
let currentY = 0;

canvas.width = CANVAS_WIDTH * scale;
canvas.height = CANVAS_HEIGHT * scale;
canvas.style.width = `${CANVAS_WIDTH * scale}px`
canvas.style.height = `${CANVAS_HEIGHT * scale}px`

ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;

window.onmousedown = function() {
    isPressed = true;
}

window.onmouseup = function() {
    isPressed = false;
}

colorpicker.oninput = function() {
    color = this.value;
}

sizepicker.oninput = function() {
    size = this.value * scale;
}


function drawOnTempCanvas(canvas) {
    let tempWidth = CANVAS_WIDTH;
    let tempHeight = CANVAS_HEIGHT;

    tempCanvas.width = tempWidth;
    tempCanvas.height = tempWidth;
    tempCtx.drawImage(canvas, 0, 0, CANVAS_WIDTH * scale, CANVAS_HEIGHT * scale, 0, 0, tempWidth, tempHeight);
}


boardsizepicker.oninput = function() {
    let newCanvasWidth =  CANVAS_WIDTH * scale;
    let newCanvasHeight =  CANVAS_HEIGHT * scale;

    scale = this.value;
    size = sizepicker.value * scale;

    canvas.width = newCanvasWidth;
    canvas.height = newCanvasHeight;
    canvas.style.width = `${newCanvasWidth}px`
    canvas.style.height = `${newCanvasHeight}px`

}


saveBtn.addEventListener('click', function (event) {

    drawOnTempCanvas(canvas);
    let download = document.getElementById("downloadLink");
    let image = tempCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

    let img = new Image();
    download.setAttribute("href", image);
})


function getMousePos(canvas, event) {
    let rect = canvas.getBoundingClientRect();

    currentX = Math.floor((event.clientX - rect.left) / scale) * scale;
    currentY = Math.floor((event.clientY - rect.top) / scale) * scale;
}


function draw(event) {
    if (isPressed) {
        // getMousePos(canvas, window);
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.fillRect(currentX, currentY, size, size);
        ctx.fill();
    }

    window.requestAnimationFrame(draw);
}


canvas.onmousemove = function (event) {
    getMousePos(canvas, event);
}

draw();
