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
            // hata
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
            // hata
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
            // hata
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
                // hata
        }
    }

    toString(){
        return `rover position x: ${this.x} rover position y: ${this.y} rover orientation: ${this.convertOrientation(this.orientation)}`;
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

rl.question("", function(map) {
    rl.question("", function(vehicle) {
            rl.question("", function(command) {
            map =map.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; } );
            vehicle =vehicle.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; } );
            var commandList =command.split('').filter( function(e) { return e.trim().length > 0; } );
            const plateau = new Plateau(map[0],map[1]);
            const rover = new Rover(vehicle[0],vehicle[1],vehicle[2]);
            console.log(`${plateau.toString()}`);
            console.log(`Rover first position: ${rover.toString()}`);
            console.log(`commandlist: ${commandList}`);
            for (const com of commandList) {
                rover.translate(com);
            }
            console.log(`Rover last position: ${rover.toString()}`);
            rl.close();
        });
    });
});

rl.on("close", function() {
    process.exit(0);
});