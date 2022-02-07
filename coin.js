let LivingCreature = require('./LivingCreature')
const Grass = require('./grass')
module.exports = class coin extends LivingCreature {

    constructor(x, y, index) {
        super(x, y, index);
        this.year = 1;

    }

    die() {
        this.year++;
        if (this.year >= 100) {

            matrix[this.y][this.x] = 1;
            for (var i in coinArr) {
                
                if (this.x == coinArr[i].x && this.y == coinArr[i].y) {
                    // coinArr.push(new coin(this.x, this.y, 4));


                    grassArr.push(new Grass(this.x, this.y, 1))
                    coinArr.splice(i, 1);
                    break;
                }
            }
        }
    }

}