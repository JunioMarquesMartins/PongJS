const   canvas = document.getElementById("canvas"),
        cx = canvas.getContext("2d");
        canvas.width = window.innerWidth - 10,
        canvas.height = window.innerHeight - 10,
        play = document.getElementById("btn-play"),
        playerStatus = document.getElementById("player-status"),
        playerOne = document.getElementById("player-one"),
        teclasTwo = document.getElementById("player-two");
        
const cicle = {
    x: canvas.width / 2 - 10,
    y: canvas.height / 2 - 10,
    elHeight: 20,
    elWidth: 20,
    dirx: -1,
    diry: 1,
    mod: 0,
    speed: 1
};
const left = {
    x: 10,
    y: canvas.height / 2 - 80,
    elHeight: 160,
    elWidth: 20,
    diry: 0,
    score: 0,
    speed: 7
};
const right = {
    x: canvas.width - 30,
    y: canvas.height / 2 - 80,
    elHeight: 160,
    elWidth: 20,
    diry: 0,
    score: 0,
    speed: 7
};

const keys = {};

document.addEventListener("keydown", function(e) {
    keys[e.keyCode] = !0;
}); 
document.addEventListener("keyup", function(e) {
    delete keys[e.keyCode];
});

const clickMoveActions = function(movePosition) {

    const speed = 200;
    const breakMove = 150;

    movePosition === 'leftUp' && left.y > breakMove ? 
    left.y -= speed : 
    movePosition === 'leftDown' && left.y + left.elHeight < (canvas.height - breakMove) && (left.y += speed), 

    movePosition === 'rightUp' && right.y > breakMove ? 
    right.y -= speed : 
    movePosition === 'rightDown' && right.y + right.elHeight < (canvas.height - breakMove) && (right.y += speed)
};

const move = function() {

    87 in keys && left.y > 0 ? 
    left.y -= left.speed : 
    83 in keys && left.y + left.elHeight < canvas.height && (left.y += left.speed), 

    38 in keys && right.y > 0 ? 
    right.y -= right.speed : 
    40 in keys && right.y + right.elHeight < canvas.height && (right.y += right.speed)

};
const movecicle = function() {
    cicle.y + cicle.elHeight >= left.y && cicle.y <= left.y + left.elHeight && cicle.x <= left.x + left.elWidth ? 
    (cicle.dirx = 1, cicle.mod += .05) : 
    cicle.y + cicle.elHeight >= right.y && cicle.y <= right.y + right.elHeight && cicle.x + cicle.elWidth >= right.x && (cicle.dirx = -1, cicle.mod += .05), 
    
    cicle.y <= 0 ? 
    cicle.diry = 1 : 
    cicle.y + cicle.elHeight >= canvas.height && (cicle.diry = -1), 
    
    cicle.x += (cicle.speed + cicle.mod) * cicle.dirx, cicle.y += (cicle.speed + cicle.mod) * cicle.diry, cicle.x < left.x + left.elWidth - 15 ? 
    updatePong("player 2") : 
    cicle.x + cicle.elWidth > right.x + 15 && updatePong("player 1")
};
const updatePong = function(e) {
    "player 1" == e ? 
    ++left.score : 
    ++right.score, 
    
    left.y = canvas.height / 2 - left.elHeight / 2, 
    right.y = left.y, 
    cicle.y = canvas.height / 2 - cicle.elHeight / 2, 
    cicle.x = canvas.width / 2 - cicle.elWidth / 2, 
    cicle.mod = 0
};

const render = function() {
    
    cx.clearRect(0, 0, canvas.width, canvas.height), 
    move(), 
    movecicle(), 
    cx.fillStyle = "white", 
    cx.fillRect(cicle.x, cicle.y, cicle.elWidth, cicle.elHeight), 
    cx.fillRect(left.x, left.y, left.elWidth, left.elHeight), 
    cx.fillRect(right.x, right.y, right.elWidth, right.elHeight)

};

render();

const  usr = function() {
    var t = document.getElementById("jugador1").value,
        e = document.getElementById("jugador2").value;
    cx.font = "13px Arial", 
    cx.fillText(t + " " + left.score, 100, 20), 
    cx.fillText(e + " " + right.score, canvas.width - 200, 20)
};

play.onclick = function(t) {
    setInterval(render, 5),
    setInterval(usr, 5), 
    playerStatus.className = "elementoHide"
}