const BOARD_MANAGER = (function () {
  const NEWBOARD = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
  ];

  const CREATE_BOARD = () => NEWBOARD;

  const LOG_BOARD = (board) =>
    console.log(`
    ${board[0][0]} | ${board[0][1]} | ${board[0][2]}
    --+---+--
    ${board[1][0]} | ${board[1][1]} | ${board[1][2]}
    --+---+--
    ${board[2][0]} | ${board[2][1]} | ${board[2][2]}
    `);

  const placePiece = function (board, piece, position) {
    board[position[0]][position[1]] = piece;
  };

  const CHECK_WINNER = function (board) {
    const WIN_CONDITIONS = [
      [board[0][0], board[0][1], board[0][2]], //Row 1
      [board[1][0], board[1][1], board[1][2]], //Row 2
      [board[2][0], board[2][1], board[2][2]], //Row 3
      [board[0][0], board[1][0], board[2][0]], //Collumn 1
      [board[0][1], board[1][1], board[2][1]], //Collumn 2
      [board[0][2], board[1][2], board[2][2]], //Collumn 3
      [board[0][0], board[1][1], board[2][2]], //Diagonal \
      [board[2][0], board[1][1], board[0][2]], //Diagonal /
    ];

    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      const row = WIN_CONDITIONS[i];
      let hasWinner = row.every(
        (element) => element === row[0] && element !== " "
      );
      if (hasWinner) {
        LOG_BOARD(board);
        return true;
      }
    }
    return false;
  };
  return {
    CREATE_BOARD,
    LOG_BOARD,
    placePiece,
    CHECK_WINNER,
  };
})();

const PLAYER_MANAGER = (function () {
  let player1 = {
    name: "Player 1",
    piece: "X",
  };
  let player2 = {
    name: "Player 2",
    piece: "O",
  };

  const getPlayer1 = () => player1;
  const getPlayer2 = () => player2;

  return {
    getPlayer1,
    getPlayer2,
  };
})();

const GAME_MANAGER = (function () {
  let currentPlayer = PLAYER_MANAGER.getPlayer1();

  const changeTurn = function () {
    currentPlayer =
      currentPlayer === PLAYER_MANAGER.getPlayer1()
        ? PLAYER_MANAGER.getPlayer2()
        : PLAYER_MANAGER.getPlayer1();
  };

  const playGame = function () {
    let board = BOARD_MANAGER.CREATE_BOARD();

    BOARD_MANAGER.LOG_BOARD(board);
    let position = [];
    for (let i = 0; i < 9; i++) {
      position[0] = parseInt(prompt("Row: "));
      position[1] = parseInt(prompt("Column: "));

      BOARD_MANAGER.placePiece(board, currentPlayer.piece, position);
      BOARD_MANAGER.LOG_BOARD(board);

      if (BOARD_MANAGER.CHECK_WINNER(board)) {
        console.log(`${currentPlayer.name} has won the game!`);
        break;
      }
      changeTurn();
    }
  };

  return { playGame };
})();

GAME_MANAGER.playGame();

// let board = BOARD_MANAGER.CREATE_BOARD();

// BOARD_MANAGER.LOG_BOARD(board);

// BOARD_MANAGER.placePiece(board, "X", [0, 2])
// BOARD_MANAGER.placePiece(board, "0", [0, 0])
// BOARD_MANAGER.placePiece(board, "X", [0, 1])

// BOARD_MANAGER.placePiece(board, "O", [2, 2])
// BOARD_MANAGER.placePiece(board, "O", [2, 0])
// BOARD_MANAGER.placePiece(board, "O", [2, 1])
