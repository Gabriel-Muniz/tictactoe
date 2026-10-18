console.log("It's working")

const GAMEBOARD_MANAGER = (() => {
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


const PLAYER_MANAGER = (() => {
    const players = [
        playerOne = {
            name: 'Player One',
            mark: 'X',
        },
        playerTwo = {
            name: 'Player Two',
            mark: 'O',
        }
    ]

    const getPlayers = () => players;

    const changePlayerName = (player, newName) => player.name = newName;

    return { getPlayers, changePlayerName };
})();


// TESTS FUNCTIONS CALLS
GAMEBOARD_MANAGER.resetBoard();
GAMEBOARD_MANAGER.placeMarker(0, 1, { mark: 'X' });
GAMEBOARD_MANAGER.placeMarker(2, 2, { mark: 'O' });
GAMEBOARD_MANAGER.logBoard()

PLAYER_MANAGER.changePlayerName(PLAYER_MANAGER.getPlayers()[1], 'Gabriel');
PLAYER_MANAGER.changePlayerName(PLAYER_MANAGER.getPlayers()[0], 'Muniz');
console.log(PLAYER_MANAGER.getPlayers());