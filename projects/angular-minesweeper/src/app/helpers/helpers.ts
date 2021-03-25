import { cloneDeep, isEqual } from 'lodash';
import {
  bomb,
  bombIcon,
  columns,
  Field, FlagFieldRes,
  flagIcon,
  GameProgressField, GameStatus,
  RowColumnObj,
  rows
} from '../model/model';

export const setupMinefield = (minefield: Field[][], bombs: number): Field[][] => {
  for (let i = 0; i < bombs; i++) {
    const row = Math.floor(Math.random() * minefield.length);
    const column = Math.floor(Math.random() * minefield[0].length);
    if (minefield[row][column] < bomb) {
      minefield[row][column] = bomb;
      minefield = increaseBombCountOfNeighbours(minefield, row, column);
    } else {
      i--;
    }
  }
  return minefield;
};

export const increaseBombCountOfNeighbours = (minefield: Field[][], row: number, column: number): Field[][] => {
  if ((minefield[row][column]) === bomb) {
    if (row - 1 >= 0 && column - 1 >= 0 && minefield[row - 1][column - 1] !== bomb) {
      minefield[row - 1][column - 1]++;
    }
    if (row - 1 >= 0 && minefield[row - 1][column] !== bomb) {
      minefield[row - 1][column]++;
    }
    if (row - 1 >= 0 && column + 1 < columns && minefield[row - 1][column + 1] !== bomb) {
      minefield[row - 1][column + 1]++;
    }
    if (column - 1 >= 0 && minefield[row][column - 1] !== bomb) {
      minefield[row][column - 1]++;
    }
    if (column + 1 < columns && minefield[row][column + 1] !== bomb) {
      minefield[row][column + 1]++;
    }
    if (row + 1 < rows && column - 1 >= 0 && minefield[row + 1][column - 1] !== bomb) {
      minefield[row + 1][column - 1]++;
    }
    if (row + 1 < rows && minefield[row + 1][column] !== bomb) {
      minefield[row + 1][column]++;
    }
    if (row + 1 < rows && column + 1 < columns && minefield[row + 1][column + 1] !== bomb) {
      minefield[row + 1][column + 1]++;
    }
  }

  return minefield;
};

export const flagField =
  (minefield: GameProgressField[][], flaggedFields: RowColumnObj[], fieldId: RowColumnObj, bombs: number):
    FlagFieldRes => {
  const index = flaggedFields.findIndex(item => isEqual(item, fieldId));
  if (index === -1) {
    if (flaggedFields.length < bombs) {
      flaggedFields.push(fieldId);
      minefield[fieldId.row][fieldId.column] = flagIcon;
    }
  } else {
    flaggedFields.splice(index, 1);
    minefield[fieldId.row][fieldId.column] = undefined;
  }
  return {minefield, flaggedFields};
};

export const fillRevealedFieldsArray = (array: string[], fieldId: string): string[] => {
  const index = array.indexOf(fieldId);
  if (index === -1) { array.push(fieldId); }
  return array;
};

export const initialize2dArray = (arrayToInit: any[][], value: string | number | undefined): any[][] =>  {
  for (let i = 0; i < rows; i++) {
    arrayToInit[i] = [];
    for (let j = 0; j < columns; j++) {
      arrayToInit[i][j] = value;
    }
  }
  return arrayToInit;
};

export const checkClickedField =
  (gameProgressField: GameProgressField[][], initialMineField: Field[][], row: number, column: number) => {
  if (gameProgressField[row][column] === undefined && gameProgressField[row][column] !== flagIcon) {
    switch (initialMineField[row][column]) {
      case 0:
        gameProgressField[row][column] =  '';
        if (column < columns - 1) {
          gameProgressField = checkClickedField(cloneDeep(gameProgressField), initialMineField, row, column + 1);
        }
        if (row >= 0) {
          gameProgressField = checkClickedField(cloneDeep(gameProgressField), initialMineField, row, column - 1);
        }
        if (row < rows - 1) {
          gameProgressField = checkClickedField(cloneDeep(gameProgressField), initialMineField, row + 1, column);
        }
        if (row < rows - 1 && column < columns - 1) {
          gameProgressField = checkClickedField(cloneDeep(gameProgressField), initialMineField, row + 1, column + 1);
        }
        if (row < rows - 1 && column >= 0) {
          gameProgressField = checkClickedField(cloneDeep(gameProgressField), initialMineField, row + 1, column - 1);
        }
        if (row > 0) {
          gameProgressField = checkClickedField(cloneDeep(gameProgressField), initialMineField, row - 1, column);
        }
        if (row > 0 && column < columns - 1) {
          gameProgressField = checkClickedField(cloneDeep(gameProgressField), initialMineField, row - 1, column + 1);
        }
        if (row > 0 && column >= 0) {
          gameProgressField = checkClickedField(cloneDeep(gameProgressField), initialMineField, row - 1, column - 1);
        }
        break;
      case 9:
        gameProgressField[row][column] = bombIcon;
        break;
      default:
        gameProgressField[row][column] = initialMineField[row][column];
    }
  }
  return gameProgressField;
};

export const checkIfGameIsWon =
  (gameProgressField: GameProgressField[][], nrOfBombs: number): boolean =>
    countOccurenceOfEllementInArray(gameProgressField, undefined) <= nrOfBombs;

export const countOccurenceOfEllementInArray = (gameProgressField: GameProgressField[][], elementToFind: GameProgressField): number =>
  ([] as GameProgressField[])
    .concat.apply(
    [], (([] as GameProgressField[])
      .concat.apply([], gameProgressField)))
    .filter(i => i === elementToFind).length;

export const endGame = (initializedGameMinefield: GameProgressField[][], gameStatus: GameStatus ): GameProgressField[][] => {
  const icon = gameStatus === 'win' ? flagIcon : bombIcon;
  return initializedGameMinefield.map((rowElement) => rowElement.map((item) => item === 0 ? '' : (item === 9 ? icon : item)));
};

export const generateFieldId = (row: number, column: number): string => 'r' + row + 'c' + column;

export const getRowAndColumnOfFieldId = (id: string): string[] => id.replace('r', '').split('c');
