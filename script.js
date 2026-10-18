console.log("It's working")

const Gameboard = (() => {
    let board = [
        [2, 0, 0],
        [0, 1, 0],
        [1, 0, 0]
    ];

    const getBoard = () => board;

    const resetBoard = () => {
        board = board.map(row => row.map(cell => cell = 0))
    }

    const placeMarker = (row, column, player) => {
        board[row][column] = player.mark;
    }

    const logBoard = () => console.table(board);

    return { getBoard, resetBoard, logBoard, placeMarker }
})();


// TESTS FUNCTIONS CALLS
Gameboard.resetBoard();
Gameboard.placeMarker(0, 1, { mark: 'X' });
Gameboard.placeMarker(2, 2, { mark: 'O' });
Gameboard.logBoard()