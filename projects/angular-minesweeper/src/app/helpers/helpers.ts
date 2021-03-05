import { bomb, Field } from '../model/model';

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
  const rows = minefield.length;
  const columns = minefield[0].length;
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

export const fillFlaggedFieldsArray = (array: string[], fieldId: string, bombs: number): string[] => {
  const index = array.indexOf(fieldId);
  if (!!fieldId ) {
    if (index === -1) {
      if (array.length < bombs) { array.push(fieldId); }
    } else {
      array.splice(index, 1);
    }
  }
  return array;
};

export const arrayOfStringsContainsValue = (array: string[], value: string): boolean => array.indexOf(value) !== -1;
