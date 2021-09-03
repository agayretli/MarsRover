class Plateau {
    constructor(x, y) {
      this.x = Number(x);
      this.y = Number(y);
    }
    isInside(x, y){
        if(x<=this.x && y<=this.y){
            return true;
        }
        return false;
    }

    toString(){
      return `plateau size x: ${this.x} plateau size y: ${this.y}`;
    }
}

module.exports = Plateau