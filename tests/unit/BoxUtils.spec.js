import { describe, it, expect, beforeEach } from 'vitest';
import { boxSizeList, BoxTools, BoxCounter, BoxSplitter } from '/src/lib/BoxUtils.js';

// Tests for BoxTools
describe('BoxTools', () => {
  it('GetNewTally should return an object with all box sizes initialized to 0', () => {
    const tally = BoxTools.GetNewTally();

    // Check that all box sizes are present and initialized to 0
    expect(Object.keys(tally).length).toBe(boxSizeList.length);
    boxSizeList.forEach(size => {
      expect(tally[size]).toBe(0);
    });
  });
});

// Tests for BoxCounter
describe('BoxCounter', () => {
  let boxCounter;

  beforeEach(() => {
    boxCounter = new BoxCounter();
  });

  it('should initialize with empty tally and zero counts', () => {
    expect(boxCounter.boxAmount).toBe(0);
    expect(boxCounter.scuAmount).toBe(0);

    boxSizeList.forEach(size => {
      expect(boxCounter.tally[size]).toBe(0);
    });
  });

  it('ResetCount should reset all counters to 0', () => {
    // First add some boxes
    boxCounter.IncrementIndex(32);
    boxCounter.IncrementIndex(16);

    expect(boxCounter.boxAmount).toBe(2);
    expect(boxCounter.scuAmount).toBe(32 + 16);

    // Then reset
    boxCounter.ResetCount();

    // Check that everything is reset
    expect(boxCounter.boxAmount).toBe(0);
    expect(boxCounter.scuAmount).toBe(0);

    boxSizeList.forEach(size => {
      expect(boxCounter.tally[size]).toBe(0);
    });
  });

  it('IncrementIndex should increment the count for a specific box size', () => {
    const boxSize = 32

    // Increment box size 32
    let result = boxCounter.IncrementIndex(boxSize);

    // Check the result
    expect(result).toBe(1);
    expect(boxCounter.tally[boxSize]).toBe(result);
    expect(boxCounter.boxAmount).toBe(result);
    expect(boxCounter.scuAmount).toBe(boxSize * result);

    // Increment again
    result = boxCounter.IncrementIndex(boxSize);

    // Check the updated result
    expect(result).toBe(2);
    expect(boxCounter.tally[boxSize]).toBe(result);
    expect(boxCounter.boxAmount).toBe(result);
    expect(boxCounter.scuAmount).toBe(result * boxSize);
  });

  it('AddToIndex should add multiple boxes of a specific size', () => {
    const boxSize = 16

    // Add 3 boxes of size 16
    let result = boxCounter.AddToIndex(boxSize, 3);

    // Check the result
    expect(result).toBe(3);
    expect(boxCounter.tally[boxSize]).toBe(result);
    expect(boxCounter.boxAmount).toBe(result);
    expect(boxCounter.scuAmount).toBe(Math.round(result * boxSize));

    // Add 2 more
    result = boxCounter.AddToIndex(boxSize, 2);

    // Check the result
    expect(result).toBe(5);
    expect(boxCounter.tally[boxSize]).toBe(result);
    expect(boxCounter.boxAmount).toBe(result);
    expect(boxCounter.scuAmount).toBe(Math.round(result * boxSize));
  });

  it('GetTallyClones should return the specified number of tally clones', () => {
    // Setup expectations
    const expectedValues = {
      32: 2,
      24: 0,
      16: 3,
      8: 0,
      4: 16,
      2: 0,
      1: 0
    }

    // Insert expected values
    boxSizeList.forEach(size => {
      boxCounter.tally[size] = expectedValues[size]
    })

    // Get 3 clones
    const clones = boxCounter.GetTallyClones(3);

    // Check the result
    expect(clones.length).toBe(3);

    // Check that each clone has the correct values
    clones.forEach(clone => {
      // Check other sizes are still 0
      boxSizeList.forEach(size => {
        expect(clone[size]).toBe(expectedValues[size]);
      });
    });

    // Check that clones are independent (deep copies)
    clones[0][32] = 10;
    expect(clones[1][32]).toBe(2);
    expect(boxCounter.tally[32]).toBe(2);
  });
});

// Tests for BoxSplitter
describe('BoxSplitter', () => {
  it('CalculateSplit should calculate the remainder when splitting boxes', () => {
    // Test perfect splits
    expect(BoxSplitter.CalculateSplit(10, 5)).toBe(0); // 10 / 5 = 2 remainder 0
    expect(BoxSplitter.CalculateSplit(20, 4)).toBe(0); // 20 / 4 = 5 remainder 0

    // Test imperfect splits
    expect(BoxSplitter.CalculateSplit(10, 3)).toBe(1); // 10 / 3 = 3 remainder 1
    expect(BoxSplitter.CalculateSplit(20, 3)).toBe(2); // 20 / 3 = 6 remainder 2
  });

  it('IsPerfectSplit should determine if a split is perfect', () => {
    // Test perfect splits
    expect(BoxSplitter.IsPerfectSplit(10, 5)).toBe(true);
    expect(BoxSplitter.IsPerfectSplit(20, 4)).toBe(true);

    // Test imperfect splits
    expect(BoxSplitter.IsPerfectSplit(10, 3)).toBe(false);
    expect(BoxSplitter.IsPerfectSplit(20, 3)).toBe(false);
  });
});
