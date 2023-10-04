const bgColor = {r: 0, g: 0, b: 255, a: 255};

var canvas = document.getElementById("gui")
var ctx = canvas.getContext("2d");
var image;
var data;
var left, right;

//test
var rect = {x:100, y:100, dx:200, dy:400, c:{r:0, g:0, b:0, a:255}};
//endtest

window.onload = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.addEventListener("keydown", keydown);
    document.addEventListener("keyup", keyup);

    image = ctx.createImageData(canvas.width, canvas.height);
    data = image.data;

    window.requestAnimationFrame(manageFrame);
}

function drawPixel(x, y, color) {
    var roundedX = Math.round(x);
    var roundedY = Math.round(y);
    var index = 4 * (canvas.width * roundedY + roundedX);
    data[index + 0] = color.r;
    data[index + 1] = color.g;
    data[index + 2] = color.b;
    data[index + 3] = color.a;
}

function swapBuffer() {
    ctx.putImageData(image, 0, 0);
}

manageFrame = () => {
    frameLogic();
    renderFrame();
    window.requestAnimationFrame(manageFrame);
}

frameLogic = () => {
    if(left) {
        rect.x--;
    }
    if(right) {
        rect.x++;
    }
}

getPixelColor = (x, y) => {
    if(x > rect.x && x < (rect.x+rect.dx) && y > rect.y && y < (rect.y+rect.dy)) {
        return rect.c;
    }
    return bgColor;
}

renderFrame = () => {
    for(let x = 0; x < canvas.width; x++) {
        for(let y = 0; y < canvas.height; y++) {
            let color = getPixelColor(x,y);
            drawPixel(x, y, color);
        }   
    }
    swapBuffer();
}

keydown = (evt) => {
    switch(evt.keyCode) {
        case 65:
        case 37: left = true; break;
        case 68:
        case 39: right = true; break;
    }
}
keyup = (evt) => {
    switch(evt.keyCode) {
        case 65:
        case 37: left = false; break;
        case 68:
        case 39: right = false; break;
    }
}