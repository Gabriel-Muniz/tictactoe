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

/*
  Players serão objetos assim como o controlador do jogo
*/
