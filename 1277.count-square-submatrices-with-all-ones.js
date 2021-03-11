/*
 * @lc app=leetcode id=1277 lang=javascript
 *
 * [1277] Count Square Submatrices with All Ones
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {number}
 */

// Dynamic Programming O(MN) O(1)
var countSquares = function (matrix) {
  let res = 0;
  for (let i = 0; i < matrix.length; ++i) {
    for (let j = 0; j < matrix[0].length; ++j) {
      if (matrix[i][j] > 0 && i > 0 && j > 0) {
        matrix[i][j] =
          Math.min(matrix[i - 1][j - 1], matrix[i - 1][j], matrix[i][j - 1]) +
          1;
        console.log(matrix);
      }
      res += matrix[i][j];
    }
  }
  return res;
};

countSquares([
  [0, 1, 1, 1],
  [1, 1, 1, 1],
  [0, 1, 1, 1],
]);
// @lc code=end
