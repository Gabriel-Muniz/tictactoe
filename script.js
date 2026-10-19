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

const DOM_MANAGER = (() => {
    const boardContainer = document.querySelector('.board-container');

    const renderBoard = () => {
        boardContainer.textContent = ''
        const board = GAMEBOARD_MANAGER.getBoard();

        board.forEach((row, index) => {
            const boardRow = document.createElement('div');
            boardRow.classList.add('board-row');
            boardRow.dataset.boardRow = index;

            row.forEach((cell, index) => {
                const boardCell = document.createElement('button');
                boardCell.classList.add('board-cell');
                boardCell.dataset.boardColumn = index;

                boardCell.textContent = (cell === 0) ? '' : cell;
                boardRow.appendChild(boardCell);
            })

            boardContainer.appendChild(boardRow);
        })
    }

    const eventsHandler = (() => {
        boardContainer.addEventListener('click', (e) => {
            const auxRow = e.target.closest('[data-board-row]').dataset.boardRow; 
            const auxColumn = e.target.dataset.boardColumn; 

            GAME_MANAGER.playRound(auxRow, auxColumn);
            
            renderBoard();
        })
    })()

    return { renderBoard };

})()

// TESTS FUNCTIONS CALLS
GAMEBOARD_MANAGER.resetBoard();
DOM_MANAGER.renderBoard();

// PODE FAZER UI