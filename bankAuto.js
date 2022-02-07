const GrassEaterEater = require('./GrassEaterEater');
let LivingCreature = require('./LivingCreature');
const coin = require('./coin');

module.exports = class bankAuto extends LivingCreature {

constructor(x,y,index){
    super(x,y, index);
    this.diesel = 200;
}

     
    chooseCell(character){
        this.getNewCoordinates();
        return super.chooseCell(character);
    }

    move() {
        var empty = this.chooseCell(0);
        var grC = this.chooseCell(1);
        var newCell = empty[Math.floor(Math.random() * empty.length)]
        var xCell = grC[Math.floor(Math.random() * grC.length)]
      
        if (newCell) {
            this.diesel--;
            var newX = newCell[0];
            var newY = newCell[1];

            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;

            this.y = newY;
            this.x = newX;
        }
        else if (xCell) {
            this.diesel -= 2;
            var newX = xCell[0];
            var newY = xCell[1];

            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 1;

            this.y = newY;
            this.x = newX;
        }
        
    }
    eat() {
        var grfourC = this.chooseCell(4);
        var coin = grfourC[Math.floor(Math.random() * grfourC.length)]
        
       
        if (coin) {
            var newX = coin[0];
            var newY = coin[1];
            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;



            for (var i in coinArr) {
                if (newX == coinArr[i].x && newY == coinArr[i].y) {
                    coinArr.splice(i, 1);
                    break;
                }
            }
            this.y = newY;
            this.x = newX;
           }
        

    }

    die() {
        if (this.diesel <= 0) {
            matrix[this.y][this.x] = 4;
            for (var i in bankAutoArr) {
                if (this.x == bankAutoArr[i].x && this.y == bankAutoArr[i].y) {
                    bankAutoArr.splice(i,1);
                    coinArr.push(new coin(this.x, this.y,4));
                    break;
                }
            }
        }
    }
}