const BOARD_CONTROLLER = (function () {
  const board = [];

  const CREATE_BOARD = () => {
    for (let i = 0; i < 3; i++) {
      board[i] = [];
      for (let j = 0; j < 3; j++) {
        board[i].push(j);
      }
    }
  }

  const getBoard = () => board;

  const LOG_BOARD = () => board.forEach(row => {
    console.log(`${row[0]} | ${row[1]} | ${row[2]}`);
    console.log('-----')
  });

  const PLACE_PIECE = (row, column, piece) => {
    console.log(row, column);
    board[row][column] = piece;
  }
  return {CREATE_BOARD, getBoard, LOG_BOARD, PLACE_PIECE}
})()

const GAME_CONTROLLER = (function () {
  const players = {
    playerOne: {
      id: 1,
      name: 'Player One',
      mark: 'X',
    },
    playerTwo: {
      id: 2,
      name: 'Player two',
      mark: 'O',
    }
  }

  let currentPlayer = players.playerOne;

  const CHANGE_TURN = () => currentPlayer = (currentPlayer === players.playerOne) ? players.playerTwo : players.playerOne;
  const PLAY_ROUND = () => {
    const chooseRow = Number(prompt('Linha?'));
    const chooseColumn = Number(prompt('Coluna?'));
    BOARD_CONTROLLER.PLACE_PIECE(chooseRow, chooseColumn, currentPlayer.mark);
  };

  const WIN_CONDITIONS = []

  const CHECK_WINNER = () => {
    gameboard = BOARD_CONTROLLER.getBoard();
    rowChecking = (element) => element

    gameboard.forEach(row => row.every())
  }

  return{CHANGE_TURN, PLAY_ROUND}
})()

BOARD_CONTROLLER.CREATE_BOARD();
GAME_CONTROLLER.PLAY_ROUND();