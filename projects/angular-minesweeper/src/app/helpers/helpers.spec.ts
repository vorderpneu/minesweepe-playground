import { cloneDeep } from 'lodash';
import { bomb, Field, flagIcon, GameProgressField } from '../model/model';
import { flagField, increaseBombCountOfNeighbours } from './helpers';

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

  describe('flagField', () => {
    let testee: GameProgressField[][];
    let expectedField: GameProgressField[][];
    it('add field to flagged Fields Array', () => {
      testee = [
          [undefined, undefined],
          [undefined, undefined]
        ];
      expectedField = [
        [undefined, flagIcon],
        [undefined, undefined]
      ];
      const result = flagField(cloneDeep(testee), [], {row: 0, column: 1}, 10);
      expect(result).toEqual( { minefield: expectedField, flaggedFields: [{row: 0, column: 1}]});
    });

    it('remove id from Array', () => {
      testee = [
        [undefined, flagIcon, undefined],
        [undefined, flagIcon, flagIcon]
      ];
      expectedField = [
        [undefined, flagIcon, undefined],
        [undefined, flagIcon, undefined]
      ];
      const result = flagField(
        cloneDeep(testee), [{row: 0, column: 1}, {row: 1, column: 1}, {row: 1, column: 2}], {row: 1, column: 2},
        10);
      expect(result).toEqual({minefield: expectedField, flaggedFields: [{row: 0, column: 1}, {row: 1, column: 1}]});
    });

    it('already flagged the maximum nr of fields', () => {
      testee = [
        [undefined, flagIcon, undefined],
        [flagIcon, flagIcon, undefined]
      ];
      expectedField = [
        [undefined, flagIcon, undefined],
        [flagIcon, flagIcon, undefined]
      ];
      const result = flagField(cloneDeep(testee), [{row: 0, column: 1}, {row: 1, column: 1}, {row: 1, column: 0}], {row: 0, column: 0}, 3);
      expect(result).toEqual({minefield: expectedField, flaggedFields: [{row: 0, column: 1}, {row: 1, column: 1}, {row: 1, column: 0}]});
    });

    it('remove flagIcon when already flagged the maximum nr of fields', () => {
      testee = [
        [undefined, flagIcon, undefined],
        [flagIcon, flagIcon, undefined]
      ];
      expectedField = [
        [undefined, flagIcon, undefined],
        [flagIcon, undefined, undefined]
      ];
      const result = flagField(cloneDeep(testee), [{row: 0, column: 1}, {row: 1, column: 1}, {row: 1, column: 0}], {row: 1, column: 1}, 3);
      expect(result).toEqual({minefield: expectedField, flaggedFields: [{row: 0, column: 1}, {row: 1, column: 0}]});
    });

  });
});
