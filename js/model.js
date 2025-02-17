function ai(lines) {
    let tilesArr = [...tiles];
    let tilesMatrix = [];
    for (let i = 0; i < matrix.length; i++) {
        tilesMatrix.push(tilesArr.slice(matrix.length * i, matrix.length * (i + 1)));
    }

    for (let k = 0; k < lines.length; k++) {
        let slice = [];
        for (let i = 0; i < lines[k].length - 2; i++) {
            slice = lines[k].slice(i, i + 3);
            if (slice[0].value == slice[1].value && slice[1].value == 'o' && slice[2].value == null) {
                setTimeout(function () {
                    playO(tilesMatrix[slice[2].coordinateX][slice[2].coordinateY], tilesArr.indexOf(tilesMatrix[slice[2].coordinateX][slice[2].coordinateY]));
                }, 1000);
                return;
            }
    
            else if (slice[0].value == slice[2].value && slice[2].value == 'o' && slice[1].value == null) {
                setTimeout(function () {
                    playO(tilesMatrix[slice[1].coordinateX][slice[1].coordinateY], tilesArr.indexOf(tilesMatrix[slice[1].coordinateX][slice[1].coordinateY]));
                }, 1000);
                return;
            }
    
            else if (slice[1].value == slice[2].value && slice[2].value == 'o' && slice[0].value == null) {
                setTimeout(function () {
                    playO(tilesMatrix[slice[0].coordinateX][slice[0].coordinateY], tilesArr.indexOf(tilesMatrix[slice[0].coordinateX][slice[0].coordinateY]));
                }, 1000);
                return;
            }
        }
    }

    for (let k = 0; k < lines.length; k++) {
        let slice = [];
        for (let i = 0; i < lines[k].length - 2; i++) {
            slice = lines[k].slice(i, i + 3);
            if (slice[0].value == slice[1].value && slice[1].value == 'x' && slice[2].value == null) {
                setTimeout(function () {
                    playO(tilesMatrix[slice[2].coordinateX][slice[2].coordinateY], tilesArr.indexOf(tilesMatrix[slice[2].coordinateX][slice[2].coordinateY]));
                }, 1000);
                return;
            }
    
            else if (slice[0].value == slice[2].value && slice[2].value == 'x' && slice[1].value == null) {
                setTimeout(function () {
                    playO(tilesMatrix[slice[1].coordinateX][slice[1].coordinateY], tilesArr.indexOf(tilesMatrix[slice[1].coordinateX][slice[1].coordinateY]));
                }, 1000);
                return;
            }
    
            else if (slice[1].value == slice[2].value && slice[2].value == 'x' && slice[0].value == null) {
                setTimeout(function () {
                    playO(tilesMatrix[slice[0].coordinateX][slice[0].coordinateY], tilesArr.indexOf(tilesMatrix[slice[0].coordinateX][slice[0].coordinateY]));
                }, 1000);
                return;
            }
        }
    }

    playRandom(tilesArr);
}

function playRandom(tilesArr) {
    let RandomNumbers = [];
    for (let i = 0; i < matrix.length ** 2; i++) {
        if (tiles[i].innerHTML == '') {
            RandomNumbers.push(i);
        }
    }

    let randomIndex = Math.floor(Math.random() * RandomNumbers.length);
    setTimeout(function () {
        playO(tilesArr[RandomNumbers[randomIndex]], RandomNumbers[randomIndex]);
    }, 1000);

}