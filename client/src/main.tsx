import React, { useReducer, useState } from 'react';
import { XorO } from './types';
import { get } from 'lodash';

type Coordinate = 0 | 1 | 2;

type Square = [Coordinate, Coordinate];

type SquareValue = XorO | undefined;

type Row = [SquareValue, SquareValue, SquareValue];

type BoardState = [Row, Row, Row];

interface BoardAction {
  player: XorO;
  square: Square;
}

// TODO: improve this to detect invalid state i.e. both players have won
// TODO: improve this to return the squares that won for UI feedback
// TODO: improve this to handle different board sizes
function getWinner(board: BoardState) {
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

function reducer(state: BoardState, { player, square }: BoardAction) {
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

const initialState: BoardState = [
  [undefined, undefined, undefined] as const,
  [undefined, undefined, undefined] as const,
  [undefined, undefined, undefined] as const,
] as const;

export const Main = () => {
  const [board, dispatch] = useReducer(reducer, initialState);
  const [player, setPlayer] = useState<XorO>('X');

  const winner = getWinner(board);

  function onSquareClick(square: Square) {
    dispatch({ player, square });
    setPlayer((currentPlayer) => (currentPlayer === 'X' ? 'O' : 'X'));
  }

  return (
    <div className="flex flex-col mt-10 items-center gap-10">
      <div className="font-bold text-2xl">Tic Tac Toe</div>
      <div className="flex flex-col gap-1">
        {board.map((row, rowIndex) => (
          <div className="flex gap-1">
            {row.map((column, columnIndex) => (
              <div
                className="border-2 border-gray-900 w-10 h-10 cursor-pointer items-center justify-center text-2xl font-bold flex"
                onClick={
                  column === undefined && winner === undefined
                    ? () =>
                        onSquareClick(
                          [rowIndex as Coordinate, columnIndex as Coordinate], // TODO: investigate removing type assertion
                        )
                    : undefined
                }
              >
                {column}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
