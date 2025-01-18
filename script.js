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

  return { getBoard, createBoard, logBoard };
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
        alert(`${currentPlayer.name} é o ganhador!`);
        break;
      }
    }
  };

  const placePiece = () => {
    let placePrompt;

    do {
      placePrompt = prompt(`${currentPlayer.name} turn's\nChoose a space to put your piece: `);
    } while (!checkPlace(placePrompt));

    currentBoard[placePrompt-1] = currentPlayer.sign;
  };

  const getCurrentBoard = () => currentBoard;

  const playTurn = () => {
    placePiece();
    checkWinner(currentBoard);
    BOARD_MANAGER.logBoard(currentBoard);
    changePlayerTurn();
  };

  const checkPlace = (place) => {
    let auxRegEx = /^([1-9])$/g;
    if (place < 1 || place > 9) {
      alert("Pick a number between 1 and 9 for the place!");
      return false;
    }
    if (!place.match(auxRegEx)) {
      alert("You must pick a number!");
      return false;
    }

    if (currentBoard[place - 1] !== "-") {
      alert("You must pick a empty place!");
      return false;
    }
    return true;
  };

  return {
    checkWinner,
    changePlayerTurn,
    placePiece,
    getCurrentBoard,
    playTurn,
  };
})();

/* Zona de teste */
PLAYER_MANAGER.changePlayerName("player1", "Gabriel");
PLAYER_MANAGER.changePlayerName("player2", "Satarolho");

BOARD_MANAGER.logBoard(GAME_MANAGER.getCurrentBoard());
GAME_MANAGER.checkWinner(BOARD_MANAGER.getBoard());
