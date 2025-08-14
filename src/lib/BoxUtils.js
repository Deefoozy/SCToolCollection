import "./types/types.js"


// Should be loaded data from another source.
// Doubt it will happen, but you never know if they will change box scu sizes.
/** @type {number[]} */
export const boxSizeList = [
  32,
  24,
  16,
  8,
  4,
  2,
  1
]


export class BoxTools {
  /** @returns {BoxCount} */
  static GetNewTally() {
    /** @type {BoxCount} */
    const boxes = {};

    for (let i = 0, l = boxSizeList.length; i < l; ++i) {
      boxes[boxSizeList[i]] = 0;
    }

    return boxes;
  }
}

/**
 * @property {BoxCount} tally
 * @property {number} scuAmount
 * @property {number} boxAmount
 */
export class BoxCounter {
  constructor() {
    this.ResetCount()
  }

  ResetCount() {
    this.tally = BoxTools.GetNewTally();
    this.boxAmount = 0;
    this.scuAmount = 0;
  }

  /** @returns {number} */
  IncrementIndex(boxSize) {
    this.scuAmount += boxSize;
    ++this.boxAmount;

    return ++this.tally[boxSize];
  }

  DecrementIndex(boxSize) {
    if (this.tally[boxSize] === 0) {
      return 0;
    }

    this.scuAmount -= boxSize;
    --this.boxAmount;

    return --this.tally[boxSize];
  }

  AddToIndex(boxSize, amount) {
    this.scuAmount += Math.round(boxSize * amount);
    this.boxAmount += amount;
    this.tally[boxSize] += amount;

    return this.tally[boxSize];
  }

  /**
   * @param {number} amount
   * @returns {BoxCount[]}
   */
  GetTallyClones(amount) {
    /** @type {BoxCount[]} */
    const tallies = [];

    for (let i = 0; i < amount; ++i) {
      tallies.push(window.structuredClone(this.tally));
    }

    return tallies;
  }
}

export class BoxSplitter {
  /**
   * @param {BoxCounter} sourceCounter
   * @param {int} splitters
   * @returns {SplitResult}
   */
  static SplitScu(sourceCounter, splitters) {
    const splitPossibility = BoxSplitter.DetermineSimpleSplitPossibility(sourceCounter, splitters);
    const splitResult = {
      aborted: false,
      splits: [],
      remainder: sourceCounter,
    }


    if (!splitPossibility.possible) {
      alert("Impossible split. suck an egg.");

      splitResult.aborted = true;

      return splitResult;
    }

    if (splitPossibility.perfectSplit) {
      splitResult.splits = BoxSplitter.SimpleSplit(sourceCounter, splitters);

      return splitResult;
    }

    /** @type {BoxCount[]} */
    const counters = [];
    for (let i = 0; i < splitters; ++i) {
      counters.push(new BoxCounter());
    }

    for (let i = 0, l = boxSizeList.length; i < l; ++i) {
      BoxSplitter.DistributeBoxes(boxSizeList[i], splitters, counters, sourceCounter);
    }

    splitResult.splits = counters;

    return splitResult;
  }

  /**
   * @param {number} boxSize
   * @param {number} splitters
   * @param {BoxCounter[]} counters
   * @param {BoxCounter} sourceCounter
   */
  static DistributeBoxes(boxSize, splitters, counters, sourceCounter) {
    const currentBoxAmount = sourceCounter.tally[boxSize];

    const baseRemainder =  BoxSplitter.CalculateSplit(currentBoxAmount, splitters);

    for (let i = 0, l = sourceCounter.tally[boxSize]; i < l; ++i) {
      // To increase perf you could add a delta tracker, instead of getting deltas everytime.
      const currentDeltas = this.GetDeltas(counters);

      const currentCounter = counters[currentDeltas.maxDeltaIndex];

      currentCounter.IncrementIndex(boxSize);
    }
  }

  /** @returns {DeltaResult} */
  static GetDeltas(counters) {
    let maxScu = 0;
    let maxIndex = -1;

    /** @type {number[]} */
    const deltas = [];

    const counterLength = counters.length;

    for (let i = 0; i < counterLength; ++i) {
      const currentScu = counters[i].scuAmount;

      if (currentScu > maxScu) {
        maxScu = currentScu;
        maxIndex = i;
      }
    }

    let equal = true;
    let maxDelta = 0;
    let maxDeltaIndex = 0;

    for (let i = 0; i < counterLength; ++i) {
      const delta = counters[i].scuAmount - maxScu;

      if (delta < maxDelta) {
        maxDeltaIndex = i;
        maxDelta = delta;

        equal = false;
      }

      deltas.push(delta);
    }

    return {
      equal,
      maxIndex,
      maxDeltaIndex,
      deltas,
    };
  }

  /**
   * @param {BoxCounter} boxCounter
   * @param {number} splitters
   * @returns {SplitPossibility}
   */
  static DetermineSimpleSplitPossibility(boxCounter, splitters) {
    /** @type {SplitPossibility} */
    const splitPossibility = {
      possible: true,
      perfectScuSplit: false,
      perfectSplit: false,
      rawScuRemainder: 0,
    }

    if (splitters <= 1 || splitters > boxCounter.boxAmount) {
      splitPossibility.possible = false;

      return splitPossibility;
    }

    splitPossibility.rawScuRemainder = BoxSplitter.CalculateSplit(boxCounter.scuAmount, splitters);
    splitPossibility.perfectScuSplit = splitPossibility.rawScuRemainder > 0;

    if (!splitPossibility.perfectScuSplit) {
      return splitPossibility;
    }

    // determine perfect box split
    for (let i = 0, l = boxSizeList.length; i < l; ++i) {
      if (!BoxSplitter.IsPerfectSplit(boxCounter.tally[boxSizeList[i]], splitters)) {
        splitPossibility.perfectSplit = false;

        return splitPossibility
      }
    }
  }

  static SimpleSplit(sourceCounter, splitters) {
    const clonedTallies = sourceCounter.GetTallyClones(splitters);

    for (let tallyIndex = 0, tallyLength = clonedTallies.length; tallyIndex < tallyLength; ++tallyIndex) {
      for (let boxIndex = 0, boxLength = boxSizeList.length; boxIndex < boxLength; ++boxIndex) {
        const currentBox = boxSizeList[boxIndex];
        clonedTallies[tallyIndex][currentBox] = clonedTallies[tallyIndex][currentBox] / splitters;
      }
    }

    return clonedTallies;
  }

  /**
   * @returns boolean
   * @param {number} input
   * @param {number} splitters
   */
  static IsPerfectSplit(input, splitters) {
    return BoxSplitter.CalculateSplit(input, splitters) === 0;
  }

  /**
   * @returns number
   * @param {number} input
   * @param {number} splitters
   */
  static CalculateSplit(input, splitters) {
    const perSplit = input / splitters;
    const perSplitRounded = Math.floor(perSplit);

    return Math.round((perSplit - perSplitRounded) * splitters);
  }
}
