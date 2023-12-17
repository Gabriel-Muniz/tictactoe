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
      console.log("This cell has a piece already");
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
      UI_MANAGER.SET_PLAYER_UI(player2._name);
      return player2;
    }
    UI_MANAGER.SET_PLAYER_UI(player1._name);
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
  let winner = "";

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

    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      const row = WIN_CONDITIONS[i];
      if (row.every((cell) => cell === row[0] && cell !== " ")) {
        GAME_MANAGER.winner = currentPlayer._name;
        return true;
      }
    }
    return false;
  };

  const PLAY_GAME = function () {
    BOARD_MANAGER.CREATE_BOARD();
  };

  return {
    CHECK_WINNER,
    PLAY_GAME,
    currentPlayer,
    winner
  };
})();

const UI_MANAGER = (function () {
  const cells = document.querySelectorAll(".board-cell");
  const playerUi = document.querySelector(".player-display");
  const dialogEnd = document.querySelector(".game-end");
  const dialogStart = document.querySelector(".game-start");
  const closeBtn = document.querySelector(".close-btn");
  const submitBtn = document.querySelector(".submit-btn");

  const player1 = document.querySelector("#player1");
  const player2 = document.querySelector("#player2");

  submitBtn.addEventListener("click", () => {
    PLAYER_MANAGER.player1._name = player1.value;
    PLAYER_MANAGER.player2._name = player2.value;
    dialogStart.close();
  });

  const SET_PLAYER_UI = (player) => {
    playerUi.textContent = player;
  };

  closeBtn.addEventListener("click", () => {
    dialogEnd.close();
  });

  cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
      if (!GAME_MANAGER.CHECK_WINNER()) {
        if (!BOARD_MANAGER.CHECK_CELL(index)) {
          BOARD_MANAGER.placePiece(index, GAME_MANAGER.currentPlayer);

          if (GAME_MANAGER.CHECK_WINNER()) {
            const playerWinner = document.querySelector(".winner-name");
            playerWinner.textContent = GAME_MANAGER.winner;
            dialogEnd.showModal();
          }
          GAME_MANAGER.currentPlayer = PLAYER_MANAGER.changeTurn(
            GAME_MANAGER.currentPlayer
          );
        }
        cell.textContent = BOARD_MANAGER.GET_BOARD()[index];
      }
    });
  });

  



  return {
    SET_PLAYER_UI,
  };
})();

GAME_MANAGER.PLAY_GAME();
