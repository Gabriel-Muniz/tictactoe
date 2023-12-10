const BOARD_MANAGER = (function () {
  const NEW_BOARD = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ];

  const CREATE_BOARD = function () {
    return NEW_BOARD;
  };

  let LOG_BOARD = function (board) {
    console.log(`
    ${board[0][0]} | ${board[0][1]} | ${board[0][2]}
  ----+---+-----
    ${board[1][0]} | ${board[1][1]} | ${board[1][2]}
  ----+---+-----
    ${board[2][0]} | ${board[2][1]} | ${board[2][2]}
    `);
  };

  let PLACE_PIECE = function (board, player, position) {
    board[position[0]][position[1]] = player.piece;
  };

  const CHECK_WINNER = function(board){
    board.forEach(row => {
        const hasWinner = row.every((cell) => {
            return (cell == "X" || cell == "O") && cell != " ";
        })
        if (hasWinner) {
            console.log("HAS WINNER");
        }
    });
  }

  return { CREATE_BOARD, LOG_BOARD, PLACE_PIECE, CHECK_WINNER};
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

  const getPlayer = function (player) {
    return player;
  };

  const setPlayer = function (player, name) {
    player.name = name;
  };

  return { getPlayer, setPlayer };
})();

const GAME_MANAGER = function () {
  let board = BOARD_MANAGER.CREATE_BOARD();
  let playerTurn = true;
  let position = [];

  BOARD_MANAGER.LOG_BOARD(board);

  let whosNext = function (player) {
    playerTurn = !player;
    return !playerTurn; //Invert boolean value, Player1 = TRUE / Player2 = FALSE
  };

  const playRound = () => {
    for (let i = 0; i < 5; i++) {
      position[0] = +prompt("Which row?");
      position[1] = +prompt("Which collumn?");
      BOARD_MANAGER.PLACE_PIECE(
        board,
        PLAYER_MANAGER.getPlayer(playerTurn ? player3 : player2),
        position
      );
      whosNext(playerTurn);
      BOARD_MANAGER.LOG_BOARD(board);
      BOARD_MANAGER.CHECK_WINNER(board);
    }
  };

  playRound();
};

GAME_MANAGER();
