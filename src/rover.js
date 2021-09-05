class Rover {
    constructor(x, y, orientation) {
        this.x = Number(x);
        this.y = Number(y);
        switch(orientation) {
            case 'E':
                this.orientation=0;
                break;
            case 'N':
                this.orientation=90;
                break;
            case 'W':
                this.orientation=180;
                break;
            case 'S':
                this.orientation=270;
                break;
            default:
                throw "Wrong orientation,try again.";
        }
    }
    translate(movement){
        switch(movement) {
            case 'L':
                this.orientation += 90;
                break;
            case 'R':
                this.orientation -= 90;
                break;
            case 'M':
                this.move();
                break;
            default:
                throw "Wrong command, try again.";
        }
    }
    move(){
        let rotation = this.orientation%360;
        if(rotation < 0)
            rotation +=360;
        switch(rotation) {
            case 0:
                this.x += 1;
                break;
            case 180:
                this.x -= 1;
                break;
            case 90:
                this.y += 1;
                break;
            case 270:
                this.y -= 1;
                break;
            default:
                throw "Wrong orientation, try again.";
        }
    }
    convertOrientation(){
        this.orientation %= 360;
        if(this.orientation < 0)
            this.orientation +=360;
        switch(this.orientation) {
            case 0:
                return 'E';
            case 90:
                return 'N';
            case 180:
                return 'W';
            case 270:
                return 'S';
            default:
                throw "Wrong orientation, try again.";
        }
    }

    run(commandList, plateau){
        for (const command of commandList) {
            this.translate(command); //calculate next position
            if(!plateau.isInside(this.x,this.y)){
                var isOutside = true;
                break;
            }
        }
        return isOutside;
    }
  
    toString(){
        return `${this.x} ${this.y} ${this.convertOrientation(this.orientation)}`;
    }
}

module.exports = Rover