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

  const placePiece = function (position, piece) {
    currentBoard[position] = piece;
  };
  return { CREATE_BOARD, LOG_BOARD, placePiece, GET_BOARD };
})();

const PLAYER_MANAGER = (function () {
  class Player{
    constructor(name, piece){
      this.name = name;
      this.piece = piece;
    }

    get name(){
      return this._name;
    }

    get piece(){
      return this._piece;
    }

    set name(name){
      this._name = name;
    }

    set piece(piece){
      this._piece = piece;
    }
  }

  let player1 = new Player("Player 1", "X");
  let player2 = new Player("Player 2", "O");

  return{
    player1,
    player2
  }
})();

BOARD_MANAGER.CREATE_BOARD();
BOARD_MANAGER.LOG_BOARD();
BOARD_MANAGER.placePiece(1, PLAYER_MANAGER.player1.piece);
BOARD_MANAGER.LOG_BOARD();