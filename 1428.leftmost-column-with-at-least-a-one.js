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

// Solution 1: 最常规的方法
// Linear Search Each Row, correct way to use the api
let leftMostColumnWithOne1 = function (binaryMatrix) {
  let rows = binaryMatrix.dimensions().get(0);
  let cols = binaryMatrix.dimensions().get(1);
  let smallestIndex = cols;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (binaryMatrix.get(row, col) == 1) {
        smallestIndex = Math.min(smallestIndex, col);
        break;
      }
    }
  }
  return smallestIndex == cols ? -1 : smallestIndex;
};

// Solution 2: Binary Search Each Row
// 缩小Column的范围，每次缩小一半，直到找到第一个1
/* 
In the row below, we've determined that the middle element is a 0.
On what side must the target element (first 1) be? The left, or the right?
Don't forget, all the 0's are before all the 1's. 
*/
let leftMostColumnWithOne2 = function (binaryMatrix) {
  let rows = binaryMatrix.dimensions()[0];
  let cols = binaryMatrix.dimensions()[1];
  let smallestIndex = cols;
  for (let row = 0; row < rows; row++) {
    // Binary Search for the first 1 in the row.
    let lo = 0;
    let hi = cols - 1;

    if (binaryMatrix.get(row, hi) == 0) {
      continue;
    }

    while (lo < hi) {
      let mid = parseInt((lo + hi) / 2);
      if (binaryMatrix.get(row, mid) == 0) {
        lo = mid + 1;
      } else {
        hi = mid;
      }
    }
    // If the last element in the search space is a 1, then this row
    // contained a 1.
    if (binaryMatrix.get(row, hi) == 1) {
      smallestIndex = Math.min(smallestIndex, hi);
    }
  }
  // If smallest_index is still set to cols, then there were no 1's in
  // the grid.
  return smallestIndex == cols ? -1 : smallestIndex;
};

// Approach 3: Start at Top Right, Move Only Left and Down
var leftMostColumnWithOne3 = function (binaryMatrix) {
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
