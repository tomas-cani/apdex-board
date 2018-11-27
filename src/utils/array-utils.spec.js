import expect from 'expect.js';
import ArrayUtils from './array-utils.js';

describe('ArrayUtils', () => {
  describe('#insertInOrder()', () => {
    it('should insert the element in order in the array by the criteria specified', () => {
      const array = [
        { a: 4, b: 1 },
        { a: 3, b: 2 },
        { a: 1, b: 3 },
      ];
      ArrayUtils.insertInOrder(array, { a: 2, b: 1 }, 'a');
      expect(array.length).to.be.equal(4);
    });
  });

  describe('#findOrderedInsertionIndex()', () => {
    it('should return the correct insertion index for some criteria', () => {
      const array = [
        { a: 4, b: 1 },
        { a: 3, b: 2 },
        { a: 1, b: 3 },
      ];
      const index = ArrayUtils.findOrderedInsertionIndex(array, { a: 2, b: 1 }, 'a');
      expect(index).to.be.equal(2);
    });
  });
});
