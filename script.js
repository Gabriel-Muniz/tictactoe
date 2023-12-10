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

  return { CREATE_BOARD, LOG_BOARD, PLACE_PIECE };
})();

const PLAYER_MANAGER = (function () {
  player1 = {
    name: "Player 1",
    piece: "X",
  };
  player2 = {
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
    for (let i = 0; i < 3; i++) {
      position[0] = +prompt("Which row?");
      position[1] = +prompt("Which collumn?");
      BOARD_MANAGER.PLACE_PIECE(
        board,
        PLAYER_MANAGER.getPlayer(playerTurn ? player1 : player2),
        position
      );
      whosNext(playerTurn);
      BOARD_MANAGER.LOG_BOARD(board);
    }
  };

  playRound();
};

GAME_MANAGER();
