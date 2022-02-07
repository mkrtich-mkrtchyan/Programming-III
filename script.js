var socket = io();
let side = 15;
let weather1= "winter";
let myChart;


  



function changer(){
    if(weather1 == "winter"){
        document.getElementById("wstyle").style.color = "#8d05e8";
    }
    else{
        document.getElementById("wstyle").style.color = "white";
    }
}
function setup() {
    // frameRate(30);
    background('#45e1a3');
    createCanvas(50 * side, 50 * side);
    document.getElementById("weather").innerHTML = weather1;
    document.getElementById("wstyle").style.backgroundColor = weathSwitcher[weather1]
    const data = {
        labels: [
          'Grass',
          'GrassEater',
          'Predator',
          'Coines',
          'Bank Auto'
        ],
        datasets: [{
          label: 'Chart of game',
          data: [15,15,15,15,15],
          backgroundColor: [
            'rgb(0, 128, 0)',
            'rgb(255, 255, 0)',
            'rgb(255, 0, 0)',
            'rgb(0, 216, 255)',
            'rgb(7, 96, 250)'
          ],
         hoverOffset: 4
        }]
      };
    const config = {
        type: 'doughnut',
        data: data,
        options: {
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#fff'
                    }
                }
            }
        }
      };
      myChart = new Chart(
        document.getElementById('myChart'),
        config
      
      );
      
      
    changer();
   

}

    socket.on ('weather', function(data){
        weather1 = data;
        document.getElementById("weather").innerHTML = weather1;
        document.getElementById("wstyle").style.backgroundColor = weathSwitcher[weather1]
       
          changer();
    })
    
    socket.on ("send datas", function(counts){
        // console.log(counts);
        document.getElementById("grass").innerHTML = counts.grass;
        document.getElementById("grassEater").innerHTML = counts.grassEater;
        document.getElementById("pred").innerHTML = counts.grassEaterEater;
        document.getElementById("coin").innerHTML = counts.coines;
        document.getElementById("bankAuto").innerHTML = counts.bankAutos;
        
        myChart.data.datasets[0].data = [counts.grass, counts.grassEater, counts.grassEaterEater, counts.coines, counts.bankAutos];
        myChart.update();
    })

 
weathSwitcher = {
    winter: "white",
    spring: "#62D319",
    summer: "green",
    autumn: "#C75520"
}

function painter(matrix) {
    
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
          
        
            if (matrix[y][x] == 1) {
                fill(weathSwitcher[weather1]);
            }
            else if (matrix[y][x] == 2) {
                fill('yellow');
            }

            else if (matrix[y][x] == 3) {
                fill('red');

            }
            else if (matrix[y][x] == 4) {
                fill('#00D8FF');
            }
            else if (matrix[y][x] == 5) {
                fill('#0760fa');
            }
            else {
                fill('#45e1a3');
            }
            rect(x * side, y * side, side, side);
           
        }
    }


}
socket.on('send matrix', painter);

function kill(){
socket.emit('killAll');
}

function spawnGr(){
    socket.emit('spawnGr');
}

function spawnGrEater(){
    socket.emit('spawnGrEater');
}

function spawnPr(){
    socket.emit('spawnPr');
}
function killPr(){
    socket.emit('killPr')
}
function spawnBoom(){
    socket.emit('spawnBoom');
}
function changeWeather(){
    socket.emit('chWeather');
}