import { BoardState, Square, XorO } from './types';

export type Move = {
  player: XorO;
  square: Square;
};

// TODO: improve this to handle different board sizes//
// TODO: improve this to detect invalid state i.e. both players have won
// TODO: improve this to return the squares that won for UI feedback
export function getWinner(board: BoardState) {
  // check rows
  for (let i = 0; i < 3; i++) {
    if (board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
      return board[i][0];
    }
  }

  // check columns
  for (let i = 0; i < 3; i++) {
    if (board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
      return board[0][i];
    }
  }

  // check diagonals
  if (board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
    return board[0][0];
  }
  if (board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
    return board[0][2];
  }

  return undefined;
}

/**
 * Plays the move on the board and returns the new board state
 */
export function move(state: BoardState, move: Move) {
  const { player, square } = move;
  const [actionRow, actionColumn] = square;
  const currentSquareValue = state[actionRow][actionColumn];

  // early return if the square is already filled
  if (currentSquareValue !== undefined) {
    return state;
  }

  // must return copies of array for useReducer to detect changes
  return state.map((row, rowIndex) => {
    if (rowIndex === actionRow) {
      return row.map((column, columnIndex) => {
        if (columnIndex === actionColumn) {
          return player;
        }
        return column;
      });
    }
    return row;
  }) as BoardState; // TODO: investigate removing type assertion;
}
