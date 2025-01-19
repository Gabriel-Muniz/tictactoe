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

  const resetBoard = () => {
    return board = createBoard();
  }

  return { getBoard, createBoard, logBoard, resetBoard   };
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
  let currentBoard = BOARD_MANAGER.getBoard();

  const changePlayerTurn = () => {
    currentPlayer =
      currentPlayer === PLAYER_MANAGER.getPlayer("player1")
        ? PLAYER_MANAGER.getPlayer("player2")
        : PLAYER_MANAGER.getPlayer("player1");
  };

  const getCurrentPlayer = () => currentPlayer;

  const checkWinner = () => {
    const winConditions = [
      [currentBoard[0], currentBoard[1], currentBoard[2]],
      [currentBoard[3], currentBoard[4], currentBoard[5]],
      [currentBoard[6], currentBoard[7], currentBoard[8]],
      [currentBoard[0], currentBoard[3], currentBoard[6]],
      [currentBoard[1], currentBoard[4], currentBoard[7]],
      [currentBoard[2], currentBoard[5], currentBoard[8]],
      [currentBoard[0], currentBoard[4], currentBoard[8]],
      [currentBoard[2], currentBoard[4], currentBoard[6]],
    ];

    let winner = false;
    for (const winGroup of winConditions) {
      if (winGroup.every((position) => position === currentPlayer.sign)) {
        winner = `${currentPlayer.name} é o ganhador!`;
        break;
      }
    }
    return winner;
  };

  const placePiece = (cell = false) => {
    if (!cell) {
      let placePrompt;

      do {
        placePrompt = prompt(
          `${currentPlayer.name} turn's\nChoose a space to put your piece: `
        );
      } while (!checkPlace(placePrompt));

      currentBoard[placePrompt - 1] = currentPlayer.sign;
    }
    if (checkPlace(cell)) {
      currentBoard[cell - 1] = currentPlayer.sign;
      return true;
    }
  };

  const getCurrentBoard = () => currentBoard;

  const playTurn = () => {
    placePiece();
    BOARD_MANAGER.logBoard(currentBoard);
  };

  const playGame = () => {
    for (let i = 0; i < 9; i++) {
      playTurn();
      if (checkWinner(currentBoard)) break;
      changePlayerTurn();
      if (i == 8) {
        alert("That's a DRAW");
      }
    }
  };

  const checkPlace = (place) => {
    let auxRegEx = /^([1-9])$/g;
    if (place < 1 || place > 9) {
      alert("Pick a number between 1 and 9 for the place!");
      return false;
    }
    if (typeof place !== "number") {
      if (!place.match(auxRegEx)) {
        alert("You must pick a number!");
        return false;
      }
    }

    if (currentBoard[place - 1] !== "-") {
      alert("You must pick a empty place!");
      return false;
    }
    return true;
  };

  const resetBoard = () => {
    currentBoard = BOARD_MANAGER.resetBoard();
  };

  return {
    checkWinner,
    changePlayerTurn,
    placePiece,
    getCurrentBoard,
    playTurn,
    playGame,
    getCurrentPlayer,
    resetBoard,
  };
})();

/* Zona de teste */
PLAYER_MANAGER.changePlayerName("player1", "Gabriel");
PLAYER_MANAGER.changePlayerName("player2", "Satarolho");

BOARD_MANAGER.logBoard(GAME_MANAGER.getCurrentBoard());
GAME_MANAGER.checkWinner(BOARD_MANAGER.getBoard());

/*          DOM         */
const DOM_MANAGER = (function () {
  const content = document.querySelector(".content");
  const boardDOM = document.querySelector(".board");
  const boardCells = document.querySelectorAll(".board-place");

  const textOutput = document.querySelector(".text-output>h1");
  textOutput.textContent = `${GAME_MANAGER.getCurrentPlayer().name} turn.`;

  const btnRestart = document.createElement("button");
  btnRestart.classList.add("btn-restart");
  btnRestart.textContent = "Restart";

  btnRestart.addEventListener("click", () => {
    GAME_MANAGER.resetBoard();
    boardDOM.style.display = "grid";
    content.removeChild(btnRestart);
    console.log(GAME_MANAGER.getCurrentPlayer().name);
    
    updateBoard();

  });

  const updateOutput = (message = false) => {

    if (!message) {
      textOutput.textContent = `${GAME_MANAGER.getCurrentPlayer().name} turn.`;
      return;
    }
    textOutput.textContent = message;
  };

  const updateBoard = () => {
    updateOutput();
    boardCells.forEach((cell) => {
      cell.textContent = (GAME_MANAGER.getCurrentBoard()[cell.dataset.cell] == '-') ? " " : GAME_MANAGER.getCurrentBoard()[cell.dataset.cell];
    });
  };

  boardCells.forEach((cell) => {
    cell.addEventListener("click", () => {
      if (!GAME_MANAGER.placePiece(Number(cell.dataset.cell) + 1)) return;

      updateBoard();
      if (GAME_MANAGER.checkWinner()) {
        updateOutput(GAME_MANAGER.checkWinner());
        boardDOM.style.display = "none";
        content.append(btnRestart);
        return;
      }
      GAME_MANAGER.changePlayerTurn();
      updateOutput();
    });
  });

  return { updateBoard };
})();
