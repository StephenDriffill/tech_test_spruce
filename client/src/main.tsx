import React, { useState } from 'react';
import { XorO } from './types';

export const Main = () => {
  const [board, setBoard] = useState<(XorO | undefined)[][]>([
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ]);

  return (
    <div className="flex flex-col mt-10 items-center gap-10">
      <div className="font-bold text-2xl">Tic Tac Toe</div>
      <div className="flex flex-col gap-1">
        {board.map((row) => (
          <div className="flex gap-1">
            {row.map((column) => (
              <div className="border-2 border-gray-900 w-10 h-10 cursor-pointer items-center justify-center text-2xl font-bold flex">
                {column}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
