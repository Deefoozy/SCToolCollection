/**
 * Contains the amount of occurrences per key. The key being the scu amount of the box and the value being the amount of occurrences
 * @typedef BoxCount
 * @type {Record[number, number]}
 */

/**
 * The result of a split action.
 * @typedef SplitResult
 * @type {object}
 * @property {boolean} aborted If the split fails for some reason this value is true.
 * @property {BoxCounter[]} splits The resulting splits.
 * @property {BoxCounter} remainder A counter with the leftover boxes that couldn't be split for some reason. if aborted is true this should contain the input counter.
 */

/**
 * The possibilities of a split, mostly meant to avoid heavier split actions if a perfect split is available. (If this actually saves time has to be tested)
 * @typedef SplitPossibility
 * @type {object}
 * @property {boolean} possible
 * @property {boolean} perfectScuSplit BasicSCU division should be equal excluding input boxes
 * @property {boolean} perfectSplit Boxes and SCU split perfectly between splitters
 * @property {number} rawScuRemainder remainder that is non-0 when perfectScuSplit is false. does not apply to perfectSplit
 */

/**
 * A collection containing the deltas based off of the number in the maxIndex.
 * @typedef DeltaResult
 * @type {object}
 * @property {boolean} equal True if all deltas are 0
 * @property {number} maxIndex The index containing the value every other delta is based on. should be zero
 * @property {number} maxDeltaIndex The index containing the highest delta.
 * @property {number[]} deltas
 */