const BOARD_MANAGER = (function () {
  const NEW_BOARD = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

  let currentBoard = [];

  const CREATE_BOARD = () => {
    currentBoard = NEW_BOARD;
  };

  const LOG_BOARD = function () {
    console.log(`
    ${currentBoard[0]} | ${currentBoard[1]} | ${currentBoard[2]}
    --+---+--
    ${currentBoard[3]} | ${currentBoard[4]} | ${currentBoard[5]}
    --+---+--
    ${currentBoard[6]} | ${currentBoard[7]} | ${currentBoard[8]}
    `);
  };

  const GET_BOARD = function () {
    return currentBoard;
  };

  const CHECK_CELL = function (position) {
    if (position < 0 || position > 8) {
      console.log("This cell doesn't exist");
      return true;
    }
    if (currentBoard[position] !== " ") {
      console.log("This cell has a piece already")
      return true;
    }
    return false;
  };

  const placePiece = function (position, piece) {
    currentBoard[position] = piece.piece;
  };
  return { CREATE_BOARD, LOG_BOARD, placePiece, GET_BOARD, CHECK_CELL };
})();

const PLAYER_MANAGER = (function () {
  class Player {
    constructor(name, piece) {
      this.name = name;
      this.piece = piece;
    }

    get name() {
      return this._name;
    }

    get piece() {
      return this._piece;
    }

    set name(name) {
      this._name = name;
    }

    set piece(piece) {
      this._piece = piece;
    }
  }

  const changeTurn = function (currentPlayer) {
    if (currentPlayer === player1) {
      return player2;
    }
    return player1;
  };

  let player1 = new Player("Player 1", "X");
  let player2 = new Player("Player 2", "O");

  return {
    player1,
    player2,
    changeTurn,
  };
})();

const GAME_MANAGER = (function () {
  let currentPlayer = PLAYER_MANAGER.player1;

  const CHECK_WINNER = () => {
    let board = BOARD_MANAGER.GET_BOARD();
    const WIN_CONDITIONS = [
      [board[0], board[1], board[2]], //First row
      [board[3], board[4], board[5]], //Second row
      [board[6], board[7], board[8]], //Third row
      [board[0], board[3], board[6]], //First column
      [board[1], board[4], board[7]], //Second column
      [board[2], board[5], board[8]], //Third column
      [board[0], board[4], board[8]], //Diagonal \
      [board[2], board[4], board[6]], //Diagonal /
    ];

    let hasWinner = false;

    WIN_CONDITIONS.forEach((row) => {
      if (row.every((cell) => cell === row[0] && cell !== " ")) {
        //If every cell in a row(WIN_CONDITIONS row) be equal then return true;
        hasWinner = true;
        return;
      }
    });
    return hasWinner;
  };

  const PLAY_GAME = function () {
    BOARD_MANAGER.CREATE_BOARD();
    for (let i = 1; i <= 9; i++) {
      BOARD_MANAGER.LOG_BOARD();

      let position;
      do {
        position = +prompt("Position: ") - 1;
      } while (BOARD_MANAGER.CHECK_CELL(position));
      BOARD_MANAGER.placePiece(position, currentPlayer);

      if (CHECK_WINNER()) {
        console.clear();
        console.log(`${currentPlayer.name} has won the game!`);
        BOARD_MANAGER.LOG_BOARD();
        break;
      }
      if (i == 9) {
        console.clear();
        console.log(`That's a draw`);
        BOARD_MANAGER.LOG_BOARD();
      }
      currentPlayer = PLAYER_MANAGER.changeTurn(currentPlayer);
    }
  };

  return {
    CHECK_WINNER,
    PLAY_GAME,
  };
})();
