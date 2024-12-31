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
        board[i].fill(SquareState.EMPTY);
    }

    console.log(board);
    let currentPlayerState = SquareState.X;
    const doTurn = (x, y) => {
        if (y >= 0 && y < 3 && x >= 0 && x <= 3 && board[y][x] === SquareState.EMPTY) {
            board[y][x] = currentPlayerState;
            if (currentPlayerState === SquareState.X) {
                currentPlayerState = SquareState.O;
            } else {
                currentPlayerState = SquareState.X;
            }
        }
        console.log(board)
    }
    return {doTurn}
}

let game = createGame();