const colorpicker = document.getElementById("colorpicker");
const sizepicker = document.getElementById("sizepicker");
const resoPickerDiv = document.getElementById("resoPicker");
const initReso = document.getElementById("submitReso");
const widthPicker = document.getElementById("widthPicker");
const heightPicker = document.getElementById("heightPicker");
const canvas = document.getElementById("board");
const saveBtn = document.getElementById("saveButton");
const ctx = canvas.getContext('2d');

const tempCanvas = document.createElement("canvas");
const tempCtx = tempCanvas.getContext('2d');

let CANVAS_WIDTH = 8;
let CANVAS_HEIGHT = 8;
let scale = Math.floor(window.innerWidth / (CANVAS_WIDTH * 2.5));
let currentWidth = CANVAS_WIDTH * scale;
let currentHeight = CANVAS_HEIGHT * scale;

let color = colorpicker.value;
let size = sizepicker.value * scale;

let isPressed = false;
let currentX = 0;
let currentY = 0;

canvas.width = CANVAS_WIDTH * scale;
canvas.height = CANVAS_HEIGHT * scale;
canvas.style.width = `${CANVAS_WIDTH * scale}px`
canvas.style.height = `${CANVAS_HEIGHT * scale}px`

ctx.mozImageSmoothingEnabled = false;  // firefox
ctx.imageSmoothingEnabled = false;

initReso.onclick = function (e) {
    CANVAS_WIDTH = parseInt(widthPicker.value);
    CANVAS_HEIGHT = parseInt(heightPicker.value);

    scale = Math.floor(window.innerWidth / (CANVAS_WIDTH * 2.5));
    color = colorpicker.value;
    size = sizepicker.value * scale;

    currentWidth = CANVAS_WIDTH * scale;
    currentHeight = CANVAS_HEIGHT * scale;
    canvas.width = CANVAS_WIDTH * scale;
    canvas.height = CANVAS_HEIGHT * scale;
    canvas.style.width = `${CANVAS_WIDTH * scale}px`;
    canvas.style.height = `${CANVAS_HEIGHT * scale}px`;

    resoPickerDiv.style.display = "none";
    draw();
    
}

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

saveBtn.addEventListener('click', function (event) {
    tempCtx.mozImageSmoothingEnabled = false;  // firefox
    tempCtx.imageSmoothingEnabled = false;
    tempCanvas.width = CANVAS_WIDTH;
    tempCanvas.height = CANVAS_HEIGHT;
    tempCtx.drawImage(canvas, 0, 0, CANVAS_WIDTH * scale, CANVAS_HEIGHT * scale, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
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


window.onmousemove = function (event) {
    getMousePos(canvas, event);
}
