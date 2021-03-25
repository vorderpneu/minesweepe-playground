export const bombs = 20;
export const bomb = 9;
export const rows = 10;
export const columns = 20;
export const flagIcon = '🚩';
export const bombIcon = '💣';
export const emptyField = '';
export const invalidFieldId = {row: -1, column: -1};

export type Field = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type GameProgressField = Field | '🚩' | '💣' | '' | undefined;
export type RowColumnObj = { row: number; column: number };
export type FlagFieldRes = {minefield: GameProgressField[][]; flaggedFields: RowColumnObj[]};
export type GameStatus = 'win' | 'loss';
