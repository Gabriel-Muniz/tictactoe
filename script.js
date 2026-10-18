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

    const getCell = (row, column) => {
        return board[row][column];
    };

    const checkEmptyCell = (cell) => {
        const emptyCell = (cell === 0) ? true : false;
        return emptyCell;
    };

    const logBoard = () => console.table(board);

    return { getBoard, resetBoard, logBoard, placeMarker, getCell, checkEmptyCell }
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

const GAME_MANAGER = (() => {
    const players = PLAYER_MANAGER.getPlayers();
    let currentPlayer = players[0];

    const checkWinner = () => {
        const board = GAMEBOARD_MANAGER.getBoard();

        const winConditions = [
            [board[0][0], board[0][1], board[0][2]], // Line win
            [board[1][0], board[1][1], board[1][2]], // Line win
            [board[2][0], board[2][1], board[2][2]], // Line win
            [board[0][0], board[1][1], board[2][2]], // Diagonal win 
            [board[0][2], board[1][1], board[2][0]], // Diagonal win
            [board[0][0], board[1][0], board[2][0]], // Column win
            [board[0][1], board[1][1], board[2][1]], // Column win
            [board[0][2], board[1][2], board[2][2]], // Column win
        ];

        if (winConditions.find(condition => condition.every(cell => cell === currentPlayer.mark))) {
            return true;
        };
    }



    const changePlayerTurn = () => {
        currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0];
    }

    const playRound = (row, column) => {

        if (!GAMEBOARD_MANAGER.checkEmptyCell(GAMEBOARD_MANAGER.getCell(row, column))) {
            return;
        }

        GAMEBOARD_MANAGER.placeMarker(row, column, currentPlayer)

        if (checkWinner()) {
            announceWinner();
            return
        };
        changePlayerTurn();
    }

    const announceWinner = () => alert(currentPlayer.name);

    return { changePlayerTurn, checkWinner, playRound }
})()

// TESTS FUNCTIONS CALLS
GAMEBOARD_MANAGER.resetBoard();

GAME_MANAGER.playRound(0, 0);
GAME_MANAGER.playRound(0, 0);
GAME_MANAGER.playRound(0, 0);
GAME_MANAGER.playRound(0, 0);
// GAME_MANAGER.playRound(0, 1);
// GAME_MANAGER.playRound(0, 2);
// GAME_MANAGER.playRound(1, 0);
// GAME_MANAGER.playRound(1, 1);
// GAME_MANAGER.playRound(1, 2);
// GAME_MANAGER.playRound(2, 0);
// GAME_MANAGER.playRound(2, 1);
// GAME_MANAGER.playRound(2, 2);

GAMEBOARD_MANAGER.logBoard()

PLAYER_MANAGER.changePlayerName(PLAYER_MANAGER.getPlayers()[0], 'Gabriel');
PLAYER_MANAGER.changePlayerName(PLAYER_MANAGER.getPlayers()[1], 'Muniz');
console.log(PLAYER_MANAGER.getPlayers());
GAME_MANAGER.checkWinner()