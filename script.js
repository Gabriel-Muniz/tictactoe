const BOARD_CONTROLLER = (function () {
  const board = [];

  const CREATE_BOARD = () => {
    for (let i = 0; i < 3; i++) {
      board[i] = [];
      for (let j = 0; j < 3; j++) {
        board[i].push('0');
      }
    }
  }

  const LOG_BOARD = () => board.forEach(row => {
    console.log(`${row[0]} | ${row[1]} | ${row[2]}`);
    console.log('-----')
  });

  const PLACE_PIECE = (row, column) => {
    console.log('Placing piece');
  }
  return {CREATE_BOARD, LOG_BOARD, PLACE_PIECE}
})()

BOARD_CONTROLLER.CREATE_BOARD();
BOARD_CONTROLLER.LOG_BOARD();