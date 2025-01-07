// TODO: Rename this to something more logical?
const SquareState = {
    EMPTY: 0,
    O: 1,
    X: 2
};

const VictoryState = {
    WIN: 0,
    TIE: 1,
    NONE: 2,
}

// squareType refers to the square the player places (X or O)
function createPlayer(squareType) {
    let type = squareType;
    let score = 0;
    return {type, score};
};

function createGame() {
    let board = [
        new Array(3),
        new Array(3), 
        new Array(3)
    ];

    let turnsDone = 0;

    for (let i=0; i < 3; i++) {
        board[i].fill(SquareState.EMPTY);
    }

    const checkForWin = () => {
        // Tie case: All tiles filled with no win condition met
        if (turnsDone >= 9) {
            return VictoryState.TIE;
        }

        // Win case 1: Same values in a row
        for (row in board) {
            console.log(row);
            if (board[row][0] != SquareState.EMPTY && board[row][0] == board[row][1] && board[row][0] == board[row][2]) {
                console.log ("Win via case 1")
                return VictoryState.WIN;
            }
        }

        // Win case 2: Diagonals
        if (board[0][0] !== SquareState.EMPTY && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
            return VictoryState.WIN;
        }        
        if (board[0][2] !== SquareState.EMPTY && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
            return VictoryState.WIN;
        }

        // Win case 3: Columns
        for (let i=0; i<3; i++) {
            if (board[0][i] !== SquareState.EMPTY && board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
                return VictoryState.WIN;
            }
        }
    }

    const doTurn = (player, x, y) => {
        if (y >= 0 && y < 3 && x >= 0 && x <= 3 && board[y][x] === SquareState.EMPTY) {
            board[y][x] = player.type;
            turnsDone++;
            let victory = checkForWin();
            if (victory === VictoryState.WIN) {
                console.log("WIN");
            } else if (victory === VictoryState.TIE) {
                console.log("TIE")
            }
        } else {
            return -1;
        }
        console.log(board);
    }
    // Returns the current gameboard/gamestate
    const getBoard = () => {
        return {board};
    }

    return {getBoard, doTurn, checkForWin};
}

// Create the renderer function
function createRenderer(game, renderDiv) {
    const render = () => {
        let gameState = game.getBoard();
        for (let i=0; i < 3; i++) {
            for (let j=0; j < 3; j++) {
                const div = document.createElement("div");
                div.className = "square";
                switch (gameState.board[j][i]) {
                    case SquareState.O:
                        div.textContent = "O";
                        break;
                    case SquareState.X:
                        div.textContent = "X";
                        break;
                    default:
                        div.textContent = "";
                }
                renderDiv.appendChild(div)
            }
        }
    }

    return {render};
}

let playerX = createPlayer(SquareState.X);
let playerO = createPlayer(SquareState.O);
let players = [playerX, playerO];
let game = createGame();
const renderDiv = document.getElementById("render");
console.log(renderDiv);
let renderer = createRenderer(game, renderDiv);
renderer.render();