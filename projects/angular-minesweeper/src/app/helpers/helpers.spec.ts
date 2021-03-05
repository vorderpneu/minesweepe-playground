import { bomb, Field } from '../model/model';
import { fillFlaggedFieldsArray, increaseBombCountOfNeighbours } from './helpers';

describe('Helpers', () => {

  describe('increaseBombCountOfNeighbours', () => {
    it('bomb right in the middle ', () => {
      const testee: Field[][] =
        [
          [0, 0, 0, 0],
          [0, bomb, 0, 0],
          [0, 0, 0, 0]
        ];
      const expectedField: Field[][] =
        [
          [1, 1, 1, 0],
          [1, bomb, 1, 0],
          [1, 1, 1, 0]
        ];

      const result = increaseBombCountOfNeighbours(testee, 1, 1);
      expect(result).toEqual(expectedField);
    });
    it('bomb top left', () => {
      const testee: Field[][] =
        [
          [bomb, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ];
      const expectedField: Field[][] =
        [
          [bomb, 1, 0, 0],
          [1, 1, 0, 0],
          [0, 0, 0, 0]
        ];

      const result = increaseBombCountOfNeighbours(testee, 0, 0);
      expect(result).toEqual(expectedField);
    });

    it('bomb top center', () => {
      const testee: Field[][] =
        [
          [0, bomb, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ];
      const expectedField: Field[][] =
        [
          [1, bomb, 1, 0],
          [1, 1, 1, 0],
          [0, 0, 0, 0]
        ];

      const result = increaseBombCountOfNeighbours(testee, 0, 1);
      expect(result).toEqual(expectedField);
    });

    it('bomb top right', () => {
      const testee: Field[][] =
        [
          [0, 0, 0, bomb],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ];
      const expectedField: Field[][] =
        [
          [0, 0, 1, bomb],
          [0, 0, 1, 1],
          [0, 0, 0, 0]
        ];

      const result = increaseBombCountOfNeighbours(testee, 0, testee[0].length - 1);
      expect(result).toEqual(expectedField);
    });

    it('bomb right center', () => {
      const testee: Field[][] =
        [
          [0, 0, 0, 0],
          [0, 0, 0, bomb],
          [0, 0, 0, 0]
        ];
      const expectedField: Field[][] =
        [
          [0, 0, 1, 1],
          [0, 0, 1, bomb],
          [0, 0, 1, 1]
        ];

      const result = increaseBombCountOfNeighbours(testee, 1, testee[0].length - 1);
      expect(result).toEqual(expectedField);
    });

    it('bomb bottom right', () => {
      const testee: Field[][] =
        [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, bomb]
        ];
      const expectedField: Field[][] =
        [
          [0, 0, 0, 0],
          [0, 0, 1, 1],
          [0, 0, 1, bomb]
        ];

      const result = increaseBombCountOfNeighbours(testee, testee.length - 1, testee[0].length - 1);
      expect(result).toEqual(expectedField);
    });

    it('bomb bottom center', () => {
      const testee: Field[][] =
        [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, bomb, 0]
        ];
      const expectedField: Field[][] =
        [
          [0, 0, 0, 0],
          [0, 1, 1, 1],
          [0, 1, bomb, 1]
        ];

      const result = increaseBombCountOfNeighbours(testee, testee.length - 1, 2);
      expect(result).toEqual(expectedField);
    });

    it('bomb bottom left', () => {
      const testee: Field[][] =
        [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [bomb, 0, 0, 0]
        ];
      const expectedField: Field[][] =
        [
          [0, 0, 0, 0],
          [1, 1, 0, 0],
          [bomb, 1, 0, 0]
        ];

      const result = increaseBombCountOfNeighbours(testee, testee.length - 1, 0);
      expect(result).toEqual(expectedField);
    });

    it('bomb center left', () => {
      const testee: Field[][] =
        [
          [0, 0, 0, 0],
          [bomb, 0, 0, 0],
          [0, 0, 0, 0]
        ];
      const expectedField: Field[][] =
        [
          [1, 1, 0, 0],
          [bomb, 1, 0, 0],
          [1, 1, 0, 0]
        ];

      const result = increaseBombCountOfNeighbours(testee, 1, 0);
      expect(result).toEqual(expectedField);
    });

    it('two neighbouring bombs - first process', () => {
      const testee: Field[][] =
        [
          [0, 0, 0, 0],
          [0, bomb, bomb, 0],
          [0, 0, 0, 0]
        ];
      const expectedField: Field[][] =
        [
          [1, 1, 1, 0],
          [1, bomb, bomb, 0],
          [1, 1, 1, 0]
        ];

      const result = increaseBombCountOfNeighbours(testee, 1, 1);
      expect(result).toEqual(expectedField);
    });

    it('two neighbouring bombs - other bomb already processed', () => {
      const testee: Field[][] =
        [
          [0, 1, 1, 1],
          [0, bomb, bomb, 1],
          [0, 1, 1, 1]
        ];
      const expectedField: Field[][] =
        [
          [1, 2, 2, 1],
          [1, bomb, bomb, 1],
          [1, 2, 2, 1]
        ];

      const result = increaseBombCountOfNeighbours(testee, 1, 1);
      expect(result).toEqual(expectedField);
    });

    it('no bombs at all', () => {
      const testee: Field[][] =
        [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ];
      const expectedField: Field[][] =
        [
          [0, 0, 0, 0],
          [0, 0, 0, 0],
          [0, 0, 0, 0]
        ];

      const result = increaseBombCountOfNeighbours(testee, 1, 1);
      expect(result).toEqual(expectedField);
    });

    it('no bombs at all', () => {
      const testee: Field[][] =
        [
          [bomb, bomb, bomb],
          [bomb, bomb, bomb],
          [bomb, bomb, bomb]
        ];
      const expectedField: Field[][] =
        [
          [bomb, bomb, bomb],
          [bomb, bomb, bomb],
          [bomb, bomb, bomb]
        ];

      const result = increaseBombCountOfNeighbours(testee, 1, 1);
      expect(result).toEqual(expectedField);
    });

    it('iteration over whole bomb field', () => {
      let testee: Field[][] =
        [
          [bomb, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          [bomb, 0, bomb, bomb, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, bomb, 0, 0, 0, 0, 0, bomb],
          [0, 0, 0, bomb, 0, 0, bomb, 0, 0, 0]
        ];
      const expectedField: Field[][] =
        [
          [bomb, 3, 2, 2, 1, 0, 0, 0, 0, 0],
          [bomb, 3, bomb, bomb, 2, 0, 0, 0, 1, 1],
          [1, 2, 4, bomb, 3, 1, 1, 1, 1, bomb],
          [0, 0, 2, bomb, 2, 1, bomb, 1, 1, 1]
        ];

      for (let i = 0; i < testee.length; i++) {
        for (let j = 0; j < testee[0].length; j++) {
          testee = increaseBombCountOfNeighbours(testee, i, j);
        }
      }

      expect(testee).toEqual(expectedField);
    });
  });

  describe('fillFlaggedFieldsArray', () => {
    it('add id to Array', () => {
      const result = fillFlaggedFieldsArray([], 'test', 10);
      expect(result).toEqual(['test']);
    });

    it('remove id to Array', () => {
      const result = fillFlaggedFieldsArray(['0', '1', '2', '3'], '2', 10);
      expect(result).toEqual(['0', '1', '3']);
    });

    it('do nothing if id is empty', () => {
      const result = fillFlaggedFieldsArray(['0', '1', '2', '3'], null, 10);
      expect(result).toEqual(['0', '1', '2', '3']);
    });

    it('already flagged the maximum nr of fields', () => {
      const result = fillFlaggedFieldsArray(['0', '1', '2'], '4', 3);
      expect(result).toEqual(['0', '1', '2']);
    });

    it('remove flag when already flagged the maximum nr of fields', () => {
      const result = fillFlaggedFieldsArray(['0', '1', '2'], '1', 3);
      expect(result).toEqual(['0', '2']);
    });

  });
});
