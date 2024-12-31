const SquareState = {
    EMPTY: 0,
    O: 1,
    X: 2
}

function createGame() {
    let board = [
        new Array(3),
        new Array(3), 
        new Array(3)
    ];
    for (let i=0; i < 3; i++) {
        board[i].fill(SquareState.EMPTY)
    }

    console.log(board);
    let currentPlayer = SquareState.X;
    const doTurn = (x, y) => {
        if (y >= 0 && y < 3) {

        }
    }
}

let game = createGame();