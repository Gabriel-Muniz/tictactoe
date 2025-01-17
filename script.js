console.log("it works");

/* 
  Criar tabuleiro

  Retornar array de 9 casas (0 - 8)
*/

const BOARD_MANAGER = (function () {

  const createBoard = () => ["X", "O", "X", "O", "X", "O", "O", "X", "X"];
  board = createBoard();

  const getBoard = () => board[0];

  const logBoard = function () {
    console.log(`
      ${board[0]} ${board[1]} ${board[2]}
      ${board[3]} ${board[4]} ${board[5]}
      ${board[6]} ${board[7]} ${board[8]}
      
    `);
  };

  return { getBoard, createBoard, logBoard };
})();

const PLAYER_MANAGER = (function(){
  const players = {
    player1: {
      name: 'Player 1',
      sign: 'X',
    },
    player2: {
      name: 'Player 2',
      sign: 'O',
    }
  }

  const changePlayerName = (jogador, newName) => {
    players[jogador].name = newName;
  }

  const logPlayer = (player) => {
    console.log(players[player]);
  }

  return {changePlayerName, logPlayer}
})()
/*
  Players serão objetos assim como o controlador do jogo
*/
