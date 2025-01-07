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
function createPlayer(playerName, squareType) {
    let name = playerName;
    let type = squareType;
    let score = 0;
    return {name, type, score};
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
            if (board[row][0] != SquareState.EMPTY && board[row][0] == board[row][1] && board[row][0] == board[row][2]) {
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
                return VictoryState.WIN;
            } else if (victory === VictoryState.TIE) {
                return VictoryState.TIE;
            } else {
                return VictoryState.NONE;
            }
        } else {
            // return -1 if a disallowed gamemove is done (clicking on a filled square)
            return -1;
        }
    }
    // Returns the current gameboard/gamestate
    const getBoard = () => {
        return {board};
    }

    return {getBoard, doTurn, checkForWin};
}

// Create the renderer function
function createRenderer(game, renderDiv, onClickFunction) {
    const render = () => {
        let gameState = game.getBoard();
        // clear the renderDiv
        renderDiv.textContent = '';
        for (let i=0; i < 3; i++) {
            for (let j=0; j < 3; j++) {
                const div = document.createElement("div");
                div.className = "square";
                div.setAttribute("data-x", i);
                div.setAttribute("data-y", j);
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
                div.addEventListener("click", onClickFunction);
                renderDiv.appendChild(div);
            }
        }
    }

    return {render}; callback
}



let playerX = createPlayer("X", SquareState.X);
let playerO = createPlayer("O", SquareState.O);
let players = [playerX, playerO];
let playerTurn = 0;
let game = createGame();
const renderDiv = document.getElementById("render");
const statusElement = document.getElementById("status");
const restartButton = document.getElementById("restart");
const boardListener = (event) => {
    let squareDiv = event.target;
    let x = Number(squareDiv.getAttribute("data-x"));
    let y = Number(squareDiv.getAttribute("data-y"));
    let status = game.doTurn(players[playerTurn], x, y);
    if (status !== -1) {
        if (status === VictoryState.WIN) {
            statusElement.textContent = "Player " + players[playerTurn].name + " wins!";
        } else if (status === VictoryState.TIE) {
           statusElement.textContent = "It's a tie!";
        } else {
            playerTurn = (playerTurn + 1) % 2;
            statusElement.textContent = "It is " + players[playerTurn].name + "'s turn";
        }
    }
    renderer.render();
}
let renderer = createRenderer(game, renderDiv, boardListener);
statusElement.textContent = "It is " + players[playerTurn].name + "'s turn";
renderer.render();

restartButton.addEventListener("click", () => {
    game = createGame();
    renderer = createRenderer(game, renderDiv, boardListener);
    renderer.render();
    playerTurn = 0;
    statusElement.textContent = "It is " + players[playerTurn].name + "'s turn";
})

const player1form = document.getElementById("player1name");
const player2form = document.getElementById("player2name");
player1form.addEventListener("input", (event) => {
    let name = event.target.value;
    playerX.name = name;
})

player2form.addEventListener("input", (event) => {
    let name = event.target.value;
    playerO.name = name;
})