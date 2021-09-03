var config = require('./config');
const Plateau = require('./src/plateau.js');
const Rover = require('./src/rover.js');
const prompt = require('prompt');
const properties = require('./src/properties.js');

prompt.start();

function run_prompt(){
    prompt.get(properties, function (err, result) {
        if (err) { return done(err); }
        const map =result.map.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; } ); //parsing plateau size
        const vehicle =result.vehicle.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; } ); //parsing rover first position
        const commandList =result.command.split('').filter( function(e) { return e.trim().length > 0; } ); //parsing commands
        const plateau = new Plateau(map[0],map[1]);
        const rover = new Rover(vehicle[0],vehicle[1],vehicle[2]);
        for (const command of commandList) {
            rover.translate(command); //calculate next position
            if(!plateau.isInside(rover.x,rover.y))
                return function(){console.log("Rover outside the plateau. Try again."); return 1;};
        }
        console.log(`Rover's current position: ${rover.toString()}`); //print current position of rover
        setTimeout(run_prompt,0);
    });
}

run_prompt();