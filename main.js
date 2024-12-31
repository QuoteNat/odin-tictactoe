// TODO: Rename this to something more logical?
const SquareState = {
    EMPTY: 0,
    O: 1,
    X: 2
};

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
    for (let i=0; i < 3; i++) {
        board[i].fill(SquareState.EMPTY);
    };

    console.log(board);
    let currentPlayerState = SquareState.X;
    const doTurn = (player, x, y) => {
        if (y >= 0 && y < 3 && x >= 0 && x <= 3 && board[y][x] === SquareState.EMPTY) {
            board[y][x] = player.type;
        }
        console.log(board);
    }
    return {doTurn};
}

let playerX = createPlayer(SquareState.X);
let playerO = createPlayer(SquareState.O);
let players = [playerX, playerO];
let game = createGame();