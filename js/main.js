let turn = 'x';
const X = 'X';
const O = 'O';

let tiles = document.querySelectorAll('.tile');
let matrix = createMatrix(Math.sqrt(tiles.length));

tiles.forEach(function (tile, i) {
    tile.onclick = function () {
        if (turn === 'x' && tile.innerHTML == '') {
            tile.innerHTML = X;
            turn = 'o';
            updateMatrix(i, 'x');
        }
        else if (turn === 'o' && tile.innerHTML == '') {
            tile.innerHTML = O;
            turn = 'x';
            updateMatrix(i, 'o');
        }
    }
});

function intialize() {
    tiles = document.querySelectorAll('.tile');
    matrix = createMatrix(Math.sqrt(tiles.length));
    tiles.forEach(function (tile, i) {
        tile.innerHTML = '';
        tile.style.color = 'var(--secondary-color)';
        tile.onclick = function () {
            if (turn === 'x' && tile.innerHTML == '') {
                tile.innerHTML = X;
                turn = 'o';
                document.getElementById('writeXSound').play();
                updateMatrix(i, 'x');
            }
            else if (turn === 'o' && tile.innerHTML == '') {
                tile.innerHTML = O;
                turn = 'x';
                document.getElementById('writeOSound').play();
                updateMatrix(i, 'o');
            }
        }
    });
    turn = 'x';
}

function updateMatrix(i, val) {
    let arr = [];
    for (let j = 0; j < matrix.length**2; j++) {
        arr.push(j)
    }

    let tempMatrix = [];
    for (let j = 0; j < matrix.length; j++) {
        tempMatrix.push(arr.slice(matrix.length * j, matrix.length * (j + 1)));
    }

    for (let j = 0; j < matrix.length; j++) {
        for (let k = 0; k < matrix.length; k++) {
            if (tempMatrix[j][k] == i) {
                matrix[j][k] = val;
                break;
            }
        }
    }

    check();
}

function check() {
    // Horizontal check
    for (let i = 0; i < matrix.length; i++) {
        let row = [];
        for (let j = 0; j < matrix.length; j++) {
            row.push([matrix[i][j], [i, j]]);
        }
        checkForMatch(row);
    }

    // Vertical check
    for (let i = 0; i < matrix.length; i++) {
        let col = [];
        for (let j = 0; j < matrix.length; j++) {
            col.push([matrix[j][i], [j, i]]);
        }
        checkForMatch(col);
    }

    // Diagonal checks
    // Check all diagonals in the direction of top-left to bottom-right
    for (let start = 0; start <= matrix.length - 3; start++) {
        let diagonal1 = [], diagonal2 = [];
        for (let i = 0; i < matrix.length - start; i++) {
            if (start + i < matrix.length && i < matrix.length) {
                diagonal1.push([matrix[start + i][i], [start + i, i]]);  // Diagonals from the left border
                diagonal2.push([matrix[i][start + i], [i, start + i]]);  // Diagonals from the top border
            }
        }
        checkForMatch(diagonal1);
        checkForMatch(diagonal2);
    }

    // Check all diagonals in the direction of top-right to bottom-left
    for (let start = 0; start <= matrix.length - 3; start++) {
        let diagonal1 = [], diagonal2 = [];
        for (let i = 0; i < matrix.length - start; i++) {
            if (start + i < matrix.length && i < matrix.length) {
                diagonal1.push([matrix[start + i][matrix.length - 1 - i], [start + i, matrix.length - 1 - i]]);  // Diagonals from the right border
                diagonal2.push([matrix[i][matrix.length - 1 - start - i], [i, matrix.length - 1 - start - i]]); // Diagonals from the bottom border
            }
        }
        checkForMatch(diagonal1);
        checkForMatch(diagonal2);
    }

    checkForDraw();
}

function checkForMatch(line) {
    let slice = [];
    for (let i = 0; i < line.length - 2; i++) {
        slice = line.slice(i, i + 3);
        if (slice[0][0] == slice[1][0] && slice[1][0] == slice[2][0] && slice[1][0] !== null) {
            displayWinner([slice[0][1], slice[1][1], slice[2][1]]);
            return false;
        }
    }
}

function displayWinner(coors) {
    let tilesArr = [];
    for (let i = 0; i < tiles.length; i++) {
        tilesArr.push(tiles[i]);
    }

    let tilesMatrix = [];
    for (let i = 0; i < matrix.length; i++) {
        tilesMatrix.push(tilesArr.slice(matrix.length * i, matrix.length * (i + 1)));
    }

    for (let i = 0; i < 3; i++) {
        let winnerTile = tilesMatrix[coors[i][0]][coors[i][1]];
        winnerTile.style.color = '#fff';
        winnerTile.style.textShadow = 'var(--shadow-color) 0 0 10px';
    }

    tiles.forEach(function (tile) {
        tile.onclick = function () {};
    });

    setTimeout(function () {
        if (!document.querySelector('.winner-box')) {
            document.body.appendChild(buildWinnerBox(tilesMatrix[coors[0][0]][coors[0][1]].innerHTML));
        }
    }, 1000);
}

let checkForDraw = function () {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix.length; j++) {
            if (matrix[i][j] == null) {
                return false;
            }
        }
    }

    setTimeout(function () {
        if (!document.querySelector('.winner-box')) {
            document.body.appendChild(buildWinnerBox());
        }
    }, 1000);
}