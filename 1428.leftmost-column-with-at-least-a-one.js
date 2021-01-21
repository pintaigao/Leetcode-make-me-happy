/*
 * @lc app=leetcode id=1428 lang=javascript
 *
 * [1428] Leftmost Column with at Least a One
 */

// @lc code=start
/**
 * // This is the BinaryMatrix's API interface.
 * // You should not implement it, or speculate about its implementation
 * function BinaryMatrix() {
 *     @param {integer} row, col
 *     @return {integer}
 *     this.get = function(row, col) {
 *         ...
 *     };
 *
 *     @return {[integer, integer]}
 *     this.dimensions = function() {
 *         ...
 *     };
 * };
 */

/**
 * @param {BinaryMatrix} binaryMatrix
 * @return {number}
 */
var leftMostColumnWithOne = function (binaryMatrix) {
  const rows = binaryMatrix.dimensions()[0];
  const cols = binaryMatrix.dimensions()[1];
  let leftMost = -1;
  for (let r = 0, c = cols - 1; r < rows && c >= 0; ) {
    if (binaryMatrix.get(r, c) == 1) {
      leftMost = c;
      c -= 1;
    } else {
      r += 1;
    }
  }
  return leftMost;
};
// @lc code=end
