class Plateau {
    constructor(x, y) {
      this.x = Number(x);
      this.y = Number(y);
    }
    isInside(x, y){
        if(0<=x && x<=this.x && 0<=y && y<=this.y){
            return true;
        }
        return false;
    }

    toString(){
      return `plateau size x: ${this.x} plateau size y: ${this.y}`;
    }
}

module.exports = Plateau