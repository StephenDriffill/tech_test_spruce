import { getInitialState, getWinner } from './helpers';
import { BoardState, XorO } from './types';

/**
 * Returns each distinct winning position for the given player
 */
function getWinningPositions(player: XorO) {
  const winningPositions: BoardState[] = [
    [
      [player, player, player] as const,
      [undefined, undefined, undefined] as const,
      [undefined, undefined, undefined] as const,
    ] as const,
    [
      [undefined, undefined, undefined] as const,
      [player, player, player] as const,
      [undefined, undefined, undefined] as const,
    ] as const,
    [
      [undefined, undefined, undefined] as const,
      [undefined, undefined, undefined] as const,
      [player, player, player] as const,
    ] as const,
    [
      [player, undefined, undefined] as const,
      [player, undefined, undefined] as const,
      [player, undefined, undefined] as const,
    ] as const,
    [
      [undefined, player, undefined] as const,
      [undefined, player, undefined] as const,
      [undefined, player, undefined] as const,
    ] as const,
    [
      [undefined, undefined, player] as const,
      [undefined, undefined, player] as const,
      [undefined, undefined, player] as const,
    ] as const,
    [
      [player, undefined, undefined] as const,
      [undefined, player, undefined] as const,
      [undefined, undefined, player] as const,
    ] as const,
    [
      [undefined, undefined, player] as const,
      [undefined, player, undefined] as const,
      [player, undefined, undefined] as const,
    ] as const,
  ];
  return winningPositions;
}

const TIE_BOARD_STATES: BoardState[] = [
  [
    ['X', 'O', 'X'] as const,
    ['O', 'X', 'O'] as const,
    ['O', 'X', 'O'] as const,
  ] as const,
  [
    ['X', 'X', 'O'] as const,
    ['O', 'O', 'X'] as const,
    ['X', 'X', 'O'] as const,
  ] as const,
];

const UNFINISHED_BOARD_STATES: BoardState[] = [
  [
    ['X', 'O', 'X'] as const,
    ['O', 'X', 'O'] as const,
    [undefined, undefined, undefined] as const,
  ] as const,
  [
    [undefined, 'O', 'X'] as const,
    [undefined, 'X', 'O'] as const,
    [undefined, 'X', 'O'] as const,
  ] as const,
  [
    [undefined, 'O', 'X'] as const,
    ['X', undefined, 'O'] as const,
    ['O', 'X', undefined] as const,
  ] as const,
  [
    ['O', 'O', undefined] as const,
    ['X', undefined, 'O'] as const,
    [undefined, 'X', 'O'] as const,
  ] as const,
];

describe('getWinner', () => {
  it.each(getWinningPositions('X'))(
    'should return X when X is the winner',
    async (...board) => {
      expect(getWinner(board)).toEqual('X');
    },
  );

  it.each(getWinningPositions('O'))(
    'should return O when O is the winner',
    async (...board) => {
      expect(getWinner(board)).toEqual('O');
    },
  );

  it.each(TIE_BOARD_STATES)(
    'should return undefined when the game is a tie',
    async (...board) => {
      expect(getWinner(board)).toBeUndefined();
    },
  );

  it.each(UNFINISHED_BOARD_STATES)(
    'should return undefined when the game is unfinished',
    async (...board) => {
      expect(getWinner(board)).toBeUndefined();
    },
  );

  it('should return undefined when the board is empty', async () => {
    expect(getWinner(getInitialState())).toBeUndefined();
  });
});
