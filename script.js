//Board
const boardManager = (function () {
  let gameboard = [2,1,2,1,1,2,2,2,0]; // Cria o novo tabuleiro

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

  const playRound = () => {
    let play;

    do {
      play = prompt("Where?");
    } while (play < 0 || play > 8 || boardManager.getBoard()[play] != 0);

    boardManager.makeMove(players.currentPlayer, play);
    boardManager.logBoard();
  };

  const playGame = () => {
    let board = boardManager.getBoard();
    let fullBoard = ((item) => item != 0);
    while(!board.every(fullBoard)){//Enquanto todo o tabuleiro não for diferente de 0(Casa vazia) ou termos um vencedor continue
      playRound();
      if(checkWinner()) return;
      changeTurn();
      fullBoard = ((item) => item != 0);
    }
    if (board.every(fullBoard)) {
      console.log(`Woomp Woomp that's a draw`)
    }
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
    ];

    const board = boardManager.getBoard();

    const winner = winConditions.find((conditions) =>
      conditions.every((cell) => board[cell] == players.currentPlayer)
    );
    // Passa sobre todas as opções de vitórias e acha a primeria que tenha todas as 'Casa' do tabuleiro com o marcador do jogador atual

    if(winner){
      console.log(`Player ${players.currentPlayer} is the winner!`);
    }
    return winner;
  };
  return { changeTurn, players, playRound, playGame };
})();

// Fazer o loop do jogo em si, com as 9 rodadas e entrar na DOM em seguida
