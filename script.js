// Initial Data
let currentColor = 'block';
let canDraw = false
let mouseX = 0;
let mouseY = 0;

let screen = document.querySelector('#tela');
let ctx =screen.getContext('2d');
/*O método HTMLCanvasElement.getContext() retorna um desenho contexto na tela ou null se o identificador de contexto não for suportado ou a tela já foi definida para um modo de contexto diferente. */

//Events
document.querySelectorAll('.colorArea .color').forEach(item => {
    item.addEventListener('click', colorClickEvent);
});
document.querySelector('.clear').addEventListener('click', clearScreen);
/*
Passo a passo para desenhar no canvas:
- Quando o click do mouse ABAIXAR , ative o modo desenho.
- Quando o mouse se MOVER, se o modo desenho estiver ativo, desenhe.
- Quando o click do mouse LEVANTAR, desative o modo desenho.
 */
screen.addEventListener('mousedown' , mouseDownEvent);
screen.addEventListener('mousemove' , mouseMoveEvent);
screen.addEventListener('mouseup' , mouseUpEvent);



// Functions

function mouseDownEvent(e) {
    canDraw = true;
    mouseX = e.pageX - screen.offsetLeft;
    mouseY = e.pageY - screen.offsetTop;
};

function  mouseMoveEvent(e) {
    if(canDraw) {
        draw(e.pageX, e.pageY);
        //canDraw() 
    }
};

function draw(x, y) {
    let pointX = x - screen.offsetLeft;
    let pointY = y - screen.offsetTop;

    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.lineJoin = "round";
    ctx.moveTo(mouseX, mouseY);
    ctx.lineTo(pointX, pointY);
    ctx.closePath();
    ctx.strokeStyle = currentColor;
    ctx.stroke();

    mouseX = pointX;
    mouseY = pointY;
}

function mouseUpEvent() {
    canDraw = false
};

function colorClickEvent(e) {
    let color = e.target.getAttribute('data-color');

    currentColor = color;
    document.querySelector('.color.active').classList.remove('active');
    e.target.classList.add('active');
}

function clearScreen() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}