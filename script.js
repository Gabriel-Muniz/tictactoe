//Board
const boardManager = (function () {
  let gameboard = [0, 0, 0, 0, 0, 0, 0, 0, 0]; // Cria o novo tabuleiro

  const logBoard = () => {
    console.log(`
    ${gameboard[0]} ${gameboard[1]} ${gameboard[2]}
    ${gameboard[3]} ${gameboard[4]} ${gameboard[5]}
    ${gameboard[6]} ${gameboard[7]} ${gameboard[8]}`);
  };

  const makeMove = (piece, position) => (gameboard[position] = piece);

  const resetBoard = () => {
    gameboard = gameboard.map((cell) => (cell = 0));
  };

  const getBoard = () => gameboard;

  return { logBoard, makeMove, resetBoard, getBoard };
})();

//Game Manager
const gameManager = (function () {
  const players = {
    player1: {
      id: 1,
      name: "Player One",
    },
    player2: {
      id: 2,
      name: "Player Two",
    },
    currentPlayer: 1,
  };

  const changeTurn = () => {
    players.currentPlayer = players.currentPlayer == 1 ? 2 : 1;
  };

  const playRound = (index) => {
    /*const play;

     do {
      play = prompt("Where?");
    } while (play < 0 || play > 8 || boardManager.getBoard()[play] != 0); */

    boardManager.makeMove(players.currentPlayer, index);
    boardManager.logBoard();
  };

  const playGame = () => {
    let board = boardManager.getBoard();
    let fullBoard = (item) => item != 0; //Condição booleana para o método de Array every.
    while (!board.every(fullBoard)) {
      //Enquanto todo o tabuleiro não for diferente de 0(Casa vazia) ou termos um vencedor continue
      playRound();

      if (checkWinner()) break;
    }
    if (board.every(fullBoard)) {
      console.log(`Woomp Woomp that's a draw`);
    }
    resetGame();
  };

  const checkWinner = () => {
    let winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]; //Array contendo as condições de vitórias armazendo posições do array, que ao serem dispostas da forma correta formarão um tabuleiro

    const board = boardManager.getBoard();

    const winner = winConditions.find((conditions) =>
      conditions.every((cell) => board[cell] == players.currentPlayer)
    );
    //Método find ira array por array e rodará every nos mesmos até que encontre uma condição de vitória satisfatória

    if (winner) {
      console.log(`Player ${players.currentPlayer} is the winner!`);
    }
    return winner;
  };

  const resetGame = () => {
    const answer = prompt("Play gain?");
    if (answer) {
      boardManager.resetBoard();
      players.currentPlayer = 1;
    }
  };

  return { changeTurn, players, playRound, playGame, resetGame, checkWinner, changeTurn };
})();

// Fazer o loop do jogo em si, com as 9 rodadas e entrar na DOM em seguida

const domManager = (function () {
  const boardElem = document.querySelector(".board");
  const board = boardManager.getBoard;

  const initBoard = () => {
    board().map((cell, index) => {
      const cellDiv = document.createElement("div");
      cellDiv.classList.add("cell-div");
      cellDiv.dataset.index = index;
      boardElem.append(cellDiv);
    });

    cellClick();
  };

  const cellClick = () => {
    const allCellDiv = document.querySelectorAll(".cell-div");

    allCellDiv.forEach((cellDiv) => {
      cellDiv.addEventListener("click", () => {
        const divIndex = cellDiv.getAttribute("data-index");

        if (board()[divIndex]) {
          //Caso a célula selecionada seja true(esteja ocupada) retorne;
          return;
        }
        gameManager.playRound(divIndex);

        if(gameManager.checkWinner()){
          alert(gameManager.checkWinner());
        };

        updateBoard();

        gameManager.changeTurn();

      });
    });
  };

  const updateBoard = () => {
    const allCellDiv = document.querySelectorAll(".cell-div");

    board().map((cell, index) => {
      if (cell == 0) {
        return;
      }
      allCellDiv[index].textContent = cell == 1 ? "X" : "O";
    });
  };

  return { initBoard };
})();

domManager.initBoard();
