console.log("it works");

/* 
  Criar tabuleiro

  Retornar array de 9 casas (0 - 8)
*/

const BOARD_MANAGER = (function () {
  const createBoard = () => ["-", "-", "-", "-", "-", "-", "-", "-", "-"];
  board = createBoard();

  const getBoard = () => board[0];

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

/* Zona de teste */
PLAYER_MANAGER.logPlayer("player1");
PLAYER_MANAGER.changePlayerName("player1", "Gabriel");
PLAYER_MANAGER.logPlayer("player1");
BOARD_MANAGER.placePiece(PLAYER_MANAGER.getPlayer('player1'), 3);
BOARD_MANAGER.logBoard();
