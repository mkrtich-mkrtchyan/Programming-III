const { count } = require('console');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000, function () {
    console.log("runed on port:3000");
});
grassArr = [];
grassEaterArr = [];
grassEaterArr = [];
grassEaterEaterArr = [];
coinArr = [];
bankAutoArr = [];
matrix = [];

var n = 50;
const Grass = require("./Grass")
const GrassEater = require("./GrassEater")
const GrassEaterEater = require('./GrassEaterEater')
const coin = require('./coin')
const bankAuto = require('./bankAuto')


let weathers = ["winter", "spring", "summer", "autumn"];


function rand(min, max) {
    return Math.random() * (max - min) + min;
}

for (let i = 0; i < n; i++) {
    matrix[i] = [];
    for (let j = 0; j < n; j++) {
        matrix[i][j] = Math.floor(rand(0, 6))

    }
}

io.sockets.emit("send matrix", matrix);




function ObjectCreator(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                matrix[y][x] = 1;
                let gr = new Grass(x, y, 1);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                matrix[y][x] = 2;
                let great = new GrassEater(x, y, 2);
                grassEaterArr.push(great);
            }
            else if (matrix[y][x] == 3) {
                matrix[y][x] = 3;
                let greateat = new GrassEaterEater(x, y, 3);
                grassEaterEaterArr.push(greateat);
            }
            else if (matrix[y][x] == 4) {
                matrix[y][x] = 4;
                let tr = new coin(x, y, 4);
                coinArr.push(tr);
            }
            else if (matrix[y][x] == 5) {
                matrix[y][x] = 5;
                let trer = new bankAuto(x, y, 5);
                bankAutoArr.push(trer);
            }
        }
    }
    io.sockets.emit('send matrix', matrix);
}

function gameScripter() {
    for (let i in grassArr) {
        if(grassArr.length <1900){
        grassArr[i].mul();
        }
       
    }
    for (let i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    for (let i in grassEaterEaterArr) {
        grassEaterEaterArr[i].eat();
    }
    for (let i in coinArr) {
        coinArr[i].die();

    }
    for (let i in bankAutoArr) {
        if(bankAutoArr.length<1900){
            bankAutoArr[i].move();
            bankAutoArr[i].eat();
        }
        bankAutoArr[i].die();
    }
    io.sockets.emit('send matrix', matrix);
}

let i = weathers.length - 1;

function weat() {

    let weather;
    weather = weathers[i--];
    if (i < 0) { i = 3 }
    io.sockets.emit('weather', weather);
}
setInterval(weat, 8000);


// Էվենտներ

function kill() {
    grassArr = [];
    grassEaterArr = [];
    grassEaterArr = [];
    grassEaterEaterArr = [];
    coinArr = [];
    coinerArr = [];
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function spawnGr() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 0) {
                matrix[y][x] = 1
                grassArr.push(new Grass(x, y, 1))
            }
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function spawnGrEater() {
    for (var i = 0; i < 15; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0 || matrix[y][x] == 1) {
            matrix[y][x] = 2
            grassEaterArr.push(new GrassEater(x, y, 2));
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function spawnPred() {
    for (var i = 0; i < 30; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 5 || matrix[y][x] == 0) {
            matrix[y][x] = 3
            grassEaterEaterArr.push(new GrassEaterEater(x, y, 3));
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function killPred() {
    for (var i = 0; i < 60; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 3) {
            matrix[y][x] = 0
            grassEaterEaterArr[i].die();

        }
    }
    io.sockets.emit("send matrix", matrix);
}

function spawnBoom() {
    for (var i = 0; i < 5; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
            bankAutoArr.push(new bankAuto(x, y, 5));
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function changeWeather() {
    weat();
}

function alldatas() {
    countd = {
        grass: grassArr.length,
        grassEater: grassEaterArr.length,
        grassEaterEater: grassEaterEaterArr.length,
        coines: coinArr.length,
        bankAutos: bankAutoArr.length
    }
    fs.writeFile("statistics.json", JSON.stringify(countd), function () {
        io.sockets.emit("send datas", countd)
    })
    // io.sockets.emit("send datas", countd)

}
setInterval(alldatas, 300);



// -------------------------------------------------------
setInterval(gameScripter, 300);
io.on('connection', function (socket) {
    ObjectCreator(matrix);
    socket.on('killAll', kill);
    socket.on('spawnGr', spawnGr);
    socket.on('spawnGrEater', spawnGrEater);
    socket.on('spawnPr', spawnPred);
    socket.on('killPr', killPred);
    socket.on('spawnBoom', spawnBoom);
    socket.on('chWeather', changeWeather);
})