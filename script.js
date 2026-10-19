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

        return false;
    }

    const checkTie = () => {
        const board = GAMEBOARD_MANAGER.getBoard();

        if (board.every(row => row.every(cell => cell !== 0))) {
            return true;
        }

        return false;
    }

    const resetGame = () => {
        GAMEBOARD_MANAGER.resetBoard();
        currentPlayer = PLAYER_MANAGER.getPlayers()[0];
    }

    const getResult = (winner = false) => {
        return (winner) ? `${winner.name} won the game! Congrats!` : "That's a tie! Well done!"
    }


    const changePlayerTurn = () => {
        currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0];
    }

    const getCurrentPlayer = () => {
        return currentPlayer;
    }

    const playRound = (row, column) => {

        if (!GAMEBOARD_MANAGER.checkEmptyCell(GAMEBOARD_MANAGER.getCell(row, column))) {
            return false;
        }

        GAMEBOARD_MANAGER.placeMarker(row, column, currentPlayer)
        return true;

    }

    return { changePlayerTurn, getResult, playRound, getCurrentPlayer, checkWinner, checkTie, resetGame }
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

    const updatePlayersName = () => {
        const playersNameDisplay = document.querySelectorAll('.player-name');
        const playersMarkDisplay = document.querySelectorAll('.player-mark');
        const players = PLAYER_MANAGER.getPlayers();

        playersNameDisplay[0].textContent = players[0].name;
        playersNameDisplay[1].textContent = players[1].name;

        playersMarkDisplay[0].textContent = players[0].mark;
        playersMarkDisplay[1].textContent = players[1].mark;
    }

    const updateDisplayTurn = () => {
        const turnDisplay = document.querySelector('.turn-display');
        turnDisplay.textContent = `${GAME_MANAGER.getCurrentPlayer().name}'s turn!`;
    }

    const displayGameResult = (result = false, clear = false) => {
        const gameResultDisplay = document.querySelector('.game-announces');

        if (clear) {
            gameResultDisplay.textContent = '';
            return
        }
        gameResultDisplay.textContent = GAME_MANAGER.getResult(result);
    }
    // updatePlayersName()

    const blockBoard = () => {
        const boardCells = document.querySelectorAll('.board-cell');

        boardCells.forEach(cell => cell.disabled = true)
    }


    const newGameEvent = (e) => {
        GAME_MANAGER.resetGame();
        renderBoard();
        displayGameResult('IGNORED PARAMETER', true);
        updateDisplayTurn();
    }

    const gameplayEvents = (e) => {

        if (!e.target.closest('.board-cell')) return;

        const auxRow = e.target.closest('[data-board-row]').dataset.boardRow;
        const auxColumn = e.target.dataset.boardColumn;

        if (!GAME_MANAGER.playRound(auxRow, auxColumn)) {
            return;
        };

        renderBoard();

        if (GAME_MANAGER.checkWinner()) {
            displayGameResult(GAME_MANAGER.getCurrentPlayer())
            blockBoard()
            return;
        }

        if (GAME_MANAGER.checkTie()) {
            displayGameResult();
            blockBoard()
            return;
        }

        GAME_MANAGER.changePlayerTurn();
        updateDisplayTurn()
    }

    const attachEventListeners = (() => {
        const newGameBtn = document.querySelector('.btn-new-game');

        newGameBtn.addEventListener('click', newGameEvent);
        boardContainer.addEventListener('click', gameplayEvents)
    })()

    return { renderBoard, updateDisplayTurn };

})()

// TESTS FUNCTIONS CALLS
GAMEBOARD_MANAGER.resetBoard();
DOM_MANAGER.updateDisplayTurn();
DOM_MANAGER.renderBoard();

// PODE FAZER UI