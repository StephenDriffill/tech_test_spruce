import React, { useReducer, useState } from 'react';
import { BoardState, Coordinate, Square, XorO } from './types';
import { getInitialState, getWinner, move, Move } from './helpers';

type BoardAction =
  | ({
      type: 'move';
    } & Move)
  | { type: 'reset' };

const STARTING_PLAYER = 'X' satisfies XorO;

function reducer(state: BoardState, action: BoardAction) {
  if (action.type === 'reset') {
    return getInitialState();
  }

  const { player, square } = action;
  return move(state, { player, square });
}

export const Main = () => {
  const [board, dispatch] = useReducer(reducer, getInitialState());
  const [player, setPlayer] = useState<XorO>(STARTING_PLAYER);

  const winner = getWinner(board);

  function onSquareClick(square: Square) {
    dispatch({ type: 'move', player, square });
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

      <div>
        {winner ? (
          <div className="text-xl font-bold text-green-500">
            Winner: {winner} !
          </div>
        ) : (
          <div className="text-xl font-bold">Player: {player}</div>
        )}
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          dispatch({ type: 'reset' });
          setPlayer(STARTING_PLAYER);
        }}
      >
        {winner !== undefined ? 'Play Again' : 'Reset'}
      </button>
    </div>
  );
};
