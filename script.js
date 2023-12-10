const boardManager = (function () {
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
    CHECK_WINNER(board);
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

    WIN_CONDITIONS.forEach((row) => {
      let hasWinner = row.every(
        (element) => element === "X" || element === "O"
      );
      if (hasWinner) {
        console.log(row);
        LOG_BOARD(board);
        return;
      }
    });
  };
  return {
    CREATE_BOARD,
    LOG_BOARD,
    placePiece,
    CHECK_WINNER,
  };
})();

// let board = boardManager.CREATE_BOARD();

// boardManager.LOG_BOARD(board);

// boardManager.placePiece(board, "X", [0, 2])
// boardManager.placePiece(board, "X", [0, 0])
// boardManager.placePiece(board, "X", [0, 1])

// boardManager.placePiece(board, "O", [2, 2])
// boardManager.placePiece(board, "O", [2, 0])
// boardManager.placePiece(board, "O", [2, 1])
