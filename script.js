console.log("Do it again, do it right");

const boardManager = (function () {
  const createBoard = () => {
    const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    return board;
  };

  const logBoard = (viewBoard) => {
    console.log(`
    ${viewBoard[0]} ${viewBoard[1]} ${viewBoard[2]}
    ${viewBoard[3]} ${viewBoard[4]} ${viewBoard[5]}
    ${viewBoard[6]} ${viewBoard[7]} ${viewBoard[8]}
    `);
  };

  const resetBoard = (resetedBoard) => {
    resetedBoard.map(place => place = 0)
  }

  const placePiece = (currentBoard, position, piece) => {
    currentBoard[position] = piece;
  };
  return { createBoard, logBoard, placePiece, resetBoard };
})();

const gameManager = (function () {
  let currentBoard = boardManager.createBoard();

  const players = {
    playerOne: {
      name: "Player One",
      id: 1,
    },
    playerTwo: {
      name: "Player Two",
      id: 2,
    },
  };
  let currentPlayer = players.playerOne;

  const playGame = () => {
    while (!currentBoard.every((piece) => piece != 0)) {

      let position = Number(prompt("Where: "));

      if (currentBoard[position] != 0 || (position < 0 || position > 8)) {
        console.log("Please pick a valid spot.");
        boardManager.resetBoard(currentBoard);
        continue;
      }

      boardManager.placePiece(currentBoard, position, currentPlayer.id)
      boardManager.logBoard(currentBoard);

      if(checkWinner()){
        alert(`Congrats ${currentPlayer.name} you've won!`)
        break;
      }

      currentPlayer = (currentPlayer == players.playerOne) ? players.playerTwo : players.playerOne;
    }
  };

  const checkWinner = () => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    const isTheSame = (piece) => currentBoard[piece] === currentPlayer.id;

    const winner = winConditions.find((condition) =>
      condition.every(isTheSame)
    );

    return winner ? true : false;
    //Procure em cada item no array winConditions o primeiro item que tenha todos seus elementos com o valor determinado
  };

  return { checkWinner, playGame };
})();
/*
  BoardManager
    -createBoard => Cria um tabuleiro com 9 casas
    -logBoard => Retorna o tabuleiro via console.
    -getBoard => Retorna o tabuleiro para outras funções
  
  gameManager
    -players => Objeto que conterá dois jogadores, armazenando nome e id
    -checkWinner => Buscará por vencedores após cada rodada, checando por linhas, colunas e diagonais.
      (Usar um Array contendo todas as possiveis vitórias usando usando método every dos arrays);
*/
