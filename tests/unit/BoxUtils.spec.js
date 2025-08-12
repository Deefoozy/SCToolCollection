import { describe, it, expect, beforeEach } from 'vitest';
import { boxSizeList, BoxTools, BoxCounter, BoxSplitter } from '../../../src/lib/BoxUtils.js';

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

    const tally = boxCounter.tally;
    boxSizeList.forEach(size => {
      expect(tally[size]).toBe(0);
    });
  });

  it('ResetCount should reset all counters to 0', () => {
    // First add some boxes
    boxCounter.IncrementIndex(32);
    boxCounter.IncrementIndex(16);

    // Then reset
    boxCounter.ResetCount();

    // Check that everything is reset
    expect(boxCounter.boxAmount).toBe(0);
    expect(boxCounter.scuAmount).toBe(0);

    const tally = boxCounter.tally;
    boxSizeList.forEach(size => {
      expect(tally[size]).toBe(0);
    });
  });

  it('IncrementIndex should increment the count for a specific box size', () => {
    // Increment box size 32
    const result = boxCounter.IncrementIndex(32);

    // Check the result
    expect(result).toBe(1);
    expect(boxCounter.tally[32]).toBe(1);
    expect(boxCounter.boxAmount).toBe(1);
    expect(boxCounter.scuAmount).toBe(32);

    // Increment again
    const result2 = boxCounter.IncrementIndex(32);

    // Check the updated result
    expect(result2).toBe(2);
    expect(boxCounter.tally[32]).toBe(2);
    expect(boxCounter.boxAmount).toBe(2);
    expect(boxCounter.scuAmount).toBe(64);
  });

  it('AddToIndex should add multiple boxes of a specific size', () => {
    // Add 3 boxes of size 16
    const result = boxCounter.AddToIndex(16, 3);

    // Check the result
    expect(result).toBe(3);
    expect(boxCounter.tally[16]).toBe(3);
    expect(boxCounter.boxAmount).toBe(3);
    expect(boxCounter.scuAmount).toBe(48);

    // Add 2 more
    const result2 = boxCounter.AddToIndex(16, 2);

    // Check the updated result
    expect(result2).toBe(5);
    expect(boxCounter.tally[16]).toBe(5);
    expect(boxCounter.boxAmount).toBe(5);
    expect(boxCounter.scuAmount).toBe(80);
  });

  it('GetTallyClones should return the specified number of tally clones', () => {
    // Add some boxes
    boxCounter.AddToIndex(32, 2);
    boxCounter.AddToIndex(16, 3);

    // Mock window.structuredClone if it doesn't exist in the test environment
    if (typeof window === 'undefined' || !window.structuredClone) {
      global.window = {
        structuredClone: obj => JSON.parse(JSON.stringify(obj))
      };
    }

    // Get 3 clones
    const clones = boxCounter.GetTallyClones(3);

    // Check the result
    expect(clones.length).toBe(3);

    // Check that each clone has the correct values
    clones.forEach(clone => {
      expect(clone[32]).toBe(2);
      expect(clone[16]).toBe(3);

      // Check other sizes are still 0
      boxSizeList.filter(size => size !== 32 && size !== 16).forEach(size => {
        expect(clone[size]).toBe(0);
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
