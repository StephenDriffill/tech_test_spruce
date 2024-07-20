export type XorO = 'X' | 'O';

export type Coordinate = 0 | 1 | 2;

export type Square = [Coordinate, Coordinate];

export type SquareValue = XorO | undefined;

export type Row = [SquareValue, SquareValue, SquareValue];

export type BoardState = [Row, Row, Row];
