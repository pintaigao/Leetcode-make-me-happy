/*
 * @lc app=leetcode id=73 lang=javascript
 *
 * [73] Set Matrix Zeroes
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function (matrix) {
  let R = matrix.length;
  let C = matrix[0].length;
  let rows = new Set();
  let cols = new Set();

  // Essentially, we mark the rows and columns that are to be made zero
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (matrix[i][j] == 0) {
        rows.add(i);
        cols.add(j);
      }
    }
  }

  // Iterate over the array once again and using the rows and cols sets, update the elements.
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (rows.has(i) || cols.has(j)) {
        matrix[i][j] = 0;
      }
    }
  }
};

// @lc code=end
