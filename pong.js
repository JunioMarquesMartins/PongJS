const   canvas = document.getElementById("canvas"),
        cx = canvas.getContext("2d");
        canvas.width = window.innerWidth - 10,
        canvas.height = window.innerHeight - 10,
        inicio = document.getElementById("btn-iniciar"),
        boxInicio = document.getElementById("inicio-game"),
        teclasLeft = document.getElementById("teclas-left"),
        teclasRight = document.getElementById("teclas-right");
        
const cicle = {
    x: canvas.width / 2 - 10,
    y: canvas.height / 2 - 10,
    alto: 20,
    ancho: 20,
    dirx: -1,
    diry: 1,
    mod: 0,
    speed: 1
};
const left = {
    x: 10,
    y: canvas.height / 2 - 80,
    alto: 160,
    ancho: 20,
    diry: 0,
    score: 0,
    speed: 7
};
const right = {
    x: canvas.width - 30,
    y: canvas.height / 2 - 80,
    alto: 160,
    ancho: 20,
    diry: 0,
    score: 0,
    speed: 7
};

const keys = {};

document.addEventListener("keydown", function(e) {
    keys[e.keyCode] = !0
}); 
document.addEventListener("keyup", function(e) {
    delete keys[e.keyCode]
});

const clickMoveActions = function(movePosition) {

    movePosition === 'leftUp' && left.y > 0 ? 
    left.y -= 160 : 
    movePosition === 'leftDown' && left.y + left.alto < canvas.height && (left.y += 160), 

    movePosition === 'rightUp' && right.y > 0 ? 
    right.y -= 160 : 
    movePosition === 'rightDown' && right.y + right.alto < canvas.height && (right.y += 160)
};

const move = function() {

    87 in keys && left.y > 0 ? 
    left.y -= left.speed : 
    83 in keys && left.y + left.alto < canvas.height && (left.y += left.speed), 

    38 in keys && right.y > 0 ? 
    right.y -= right.speed : 
    40 in keys && right.y + right.alto < canvas.height && (right.y += right.speed)

};
const movecicle = function() {
    cicle.y + cicle.alto >= left.y && cicle.y <= left.y + left.alto && cicle.x <= left.x + left.ancho ? 
    (cicle.dirx = 1, cicle.mod += .05) : 
    cicle.y + cicle.alto >= right.y && cicle.y <= right.y + right.alto && cicle.x + cicle.ancho >= right.x && (cicle.dirx = -1, cicle.mod += .05), 
    
    cicle.y <= 0 ? 
    cicle.diry = 1 : 
    cicle.y + cicle.alto >= canvas.height && (cicle.diry = -1), 
    
    cicle.x += (cicle.speed + cicle.mod) * cicle.dirx, cicle.y += (cicle.speed + cicle.mod) * cicle.diry, cicle.x < left.x + left.ancho - 15 ? 
    updatePong("player 2") : 
    cicle.x + cicle.ancho > right.x + 15 && updatePong("player 1")
};
const updatePong = function(e) {
    "player 1" == e ? 
    ++left.score : 
    ++right.score, 
    
    left.y = canvas.height / 2 - left.alto / 2, 
    right.y = left.y, 
    cicle.y = canvas.height / 2 - cicle.alto / 2, 
    cicle.x = canvas.width / 2 - cicle.ancho / 2, 
    cicle.mod = 0
};

const render = function() {
    
    cx.clearRect(0, 0, canvas.width, canvas.height), 
    move(), 
    movecicle(), 
    cx.fillStyle = "white", 
    cx.fillRect(cicle.x, cicle.y, cicle.ancho, cicle.alto), 
    cx.fillRect(left.x, left.y, left.ancho, left.alto), 
    cx.fillRect(right.x, right.y, right.ancho, right.alto)

};

render();

const  usr = function() {
    var t = document.getElementById("jugador1").value,
        e = document.getElementById("jugador2").value;
    cx.font = "20px Arial", 
    cx.fillText(t + " " + left.score, 100, 20), 
    cx.fillText(e + " " + right.score, canvas.width - 200, 20)
};

inicio.onclick = function(t) {
    setInterval(render, 5),
    setInterval(usr, 5), 
    boxInicio.className = "elementoHide",
    teclasLeft.className = "elementoHide",
    teclasRight.className = "elementoHide"
}