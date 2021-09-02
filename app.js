var config = require('./config');

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
        }
    }

    toString(){
        return `${this.x} ${this.y} ${this.convertOrientation(this.orientation)}`;
    }
}

class Plateau {
  constructor(x, y) {
    this.x = Number(x);
    this.y = Number(y);
  }
  toString(){
    return `plateau size x: ${this.x} plateau size y: ${this.y}`;
  }
}

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function read(){
    try{
        rl.question("", function(map) { //read plateau size
            rl.question("", function(vehicle) { //read rover position
                    rl.question("", function(command) { //read commands
                    map =map.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; } ); //parsing plateau size
                    vehicle =vehicle.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; } ); //parsing rover first position
                    var commandList =command.split('').filter( function(e) { return e.trim().length > 0; } ); //parsing commands
                    const plateau = new Plateau(map[0],map[1]);
                    const rover = new Rover(vehicle[0],vehicle[1],vehicle[2]);
                    for (const com of commandList) {
                        rover.translate(com); //calculate next position
                    }
                    console.log(`${rover.toString()}`); //print last position
                    rl.close();
                });
            });
        });
    }catch(e){
        console.error(e);
    }
}
read();