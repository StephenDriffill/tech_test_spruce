import React, { useReducer, useState } from 'react';
import { XorO } from './types';

type Coordinate = 0 | 1 | 2;

type Square = [Coordinate, Coordinate];

type SquareValue = XorO | undefined;

type Row = [SquareValue, SquareValue, SquareValue];

type BoardState = [Row, Row, Row];

interface BoardAction {
  player: XorO;
  square: Square;
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
  });
}

const initialState: BoardState = [
  [undefined, undefined, undefined] as const,
  [undefined, undefined, undefined] as const,
  [undefined, undefined, undefined] as const,
] as const;

export const Main = () => {
  const [board, dispatch] = useReducer(reducer, initialState);
  const [player, setPlayer] = useState<XorO>('X');

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
                onClick={() =>
                  onSquareClick(
                    [rowIndex as Coordinate, columnIndex as Coordinate], // TODO: investigate removing type assertion
                  )
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
