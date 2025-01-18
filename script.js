console.log("it works");

/* 
  Criar tabuleiro

  Retornar array de 9 casas (0 - 8)
*/

const BOARD_MANAGER = (function () {
  const createBoard = () => ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
  let board = createBoard();

  const getBoard = () => board;

  const logBoard = function () {
    console.log(`
      ${board[0]} ${board[1]} ${board[2]}
      ${board[3]} ${board[4]} ${board[5]}
      ${board[6]} ${board[7]} ${board[8]}
      
    `);
  };

  const placePiece = (player, place) => {
    board[place] = player.sign;
  };

  return { getBoard, createBoard, logBoard, placePiece };
})();

const PLAYER_MANAGER = (function () {
  const players = {
    player1: {
      name: "Player 1",
      sign: "X",
    },
    player2: {
      name: "Player 2",
      sign: "O",
    },
  };

  const changePlayerName = (jogador, newName) => {
    players[jogador].name = newName;
  };

  const logPlayer = (player) => {
    console.log(players[player]);
  };

  const getPlayer = (player) => players[player];

  return { changePlayerName, logPlayer, getPlayer };
})();

const GAME_MANAGER = (function () {
  let currentPlayer = PLAYER_MANAGER.getPlayer("player1");

  const changePlayerTurn =
    currentPlayer === PLAYER_MANAGER.getPlayer("player1")
      ? PLAYER_MANAGER.getPlayer("player2")
      : PLAYER_MANAGER.getPlayer("player1");

  const checkWinner = (board) => {
    const winConditions = [
      [board[0], board[1], board[2]],
      [board[3], board[4], board[5]],
      [board[6], board[7], board[8]],
      [board[0], board[3], board[6]],
      [board[1], board[4], board[7]],
      [board[2], board[5], board[8]],
      [board[0], board[4], board[8]],
      [board[2], board[4], board[6]],
    ];

    for (const winGroup of winConditions) {
      if (winGroup.every((position) => position === currentPlayer.sign)) {
        console.log(`${currentPlayer.name} é o ganhador!`);
        break;
      }
    }
  };

  return { checkWinner, changePlayerTurn};
})();

/* Zona de teste */
PLAYER_MANAGER.logPlayer("player1");
PLAYER_MANAGER.changePlayerName("player1", "Gabriel");
PLAYER_MANAGER.logPlayer("player1");
BOARD_MANAGER.placePiece(PLAYER_MANAGER.getPlayer("player1"), 0);
BOARD_MANAGER.placePiece(PLAYER_MANAGER.getPlayer("player1"), 4);
BOARD_MANAGER.placePiece(PLAYER_MANAGER.getPlayer("player1"), 8);
BOARD_MANAGER.logBoard();
GAME_MANAGER.checkWinner(BOARD_MANAGER.getBoard());
