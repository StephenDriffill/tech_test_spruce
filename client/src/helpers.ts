// TODO: improve this to detect invalid state i.e. both players have won
// TODO: improve this to return the squares that won for UI feedback

import { BoardState } from './types';

// TODO: improve this to handle different board sizes
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
