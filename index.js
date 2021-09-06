const fs = require('fs');
let roomDimensions = [],
    hooverPosition = [],
    dirtPatchPositions = [],
    directions = [],
    foundDirtPatches = [];

// Check if hoover position is a dirt patch
const isDirtPatch = (hooverPosition, dirtPatchPositions) => {
    return dirtPatchPositions.find((position) => JSON.stringify(position) === JSON.stringify(hooverPosition));
}

// Read input file and traverse the room
const readInputAndTraverseRoom = () => {
    // Read input.txt file by line
    let inputFileLines = fs.readFileSync('input.txt').toString().split("\n");
    for(line in inputFileLines) {
        if(line == 0) {
            // Set room dimensions
            roomDimensions = inputFileLines[line].split(" ").map((val) => Number(val));
        }
        else if(line == 1){
            // Set initial hoover position
            hooverPosition = inputFileLines[line].split(" ").map((val) => Number(val));;
        }
        else if (line == inputFileLines.length - 1){
            // Set dirt patch position
            directions = inputFileLines[line].split("");
        }
        else{
            // Set hoover directions
            dirtPatchPositions.push(inputFileLines[line].split(" ").map((val) => Number(val)));
        }
    }

    // Hoover Direction Logic
    for(let i = 0; i < directions.length; i++){
        switch(directions[i].toLowerCase()){
            case "n":
                if(hooverPosition[1] < roomDimensions[1] - 1){
                    hooverPosition[1]++;
                }
                break;
            case "s":
                if(hooverPosition[1] > 0){
                    hooverPosition[1]--;
                }
                break;   
            case "e":
                if(hooverPosition[0] < roomDimensions[0] - 1){
                    hooverPosition[0]++;
                }
                break;
            case "w":
                if(hooverPosition[0] > 0){
                    hooverPosition[0]--;
                }
                break;
        }

        // Check if hoover position is a dirt patch
        if(isDirtPatch(hooverPosition, dirtPatchPositions)) {
            foundDirtPatches.push(hooverPosition);
        }
    }

    // Return Final Hoover Position & Dirt Patches Cleaned
    console.log(hooverPosition[0] + " " + hooverPosition[1]);
    console.log(new Set(Array.from(foundDirtPatches)).size);
}

(function init() {
    readInputAndTraverseRoom();
})();