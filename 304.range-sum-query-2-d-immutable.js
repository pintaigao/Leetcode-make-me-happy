/*
 * @lc app=leetcode id=304 lang=javascript
 *
 * [304] Range Sum Query 2D - Immutable
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 */
/* 方法一：preSum */
var NumMatrix = function (matrix) {
  let m = matrix.length;
  if (m > 0) {
    let n = matrix[0].length;
    this.preSum = new Array(m).fill(0).map(() => new Array(n).fill(0));
    this.preSum[0][0] = matrix[0][0];
    for (let i = 1; i < m; i++) {
      this.preSum[i][0] = this.preSum[i - 1][0] + matrix[i][0];
    }
    for (let i = 1; i < n; i++) {
      this.preSum[0][i] = this.preSum[0][i - 1] + matrix[0][i];
    }
    for (let i = 1; i < m; i++) {
      for (let j = 1; j < n; j++) {
        this.preSum[i][j] = matrix[i][j] + this.preSum[i - 1][j] + this.preSum[i][j - 1] - this.preSum[i - 1][j - 1];
      }
    }
  }
};

/**
 * @param {number} row1
 * @param {number} col1
 * @param {number} row2
 * @param {number} col2
 * @return {number}
 */
NumMatrix.prototype.sumRegion = function (row1, col1, row2, col2) {
  if (row1 == 0 && col1 == 0) {
    return this.preSum[row2][col2];
  } else if (row1 == 0) {
    return this.preSum[row2][col2] - this.preSum[row2][col1 - 1];
  } else if (col1 == 0) {
    return this.preSum[row2][col2] - this.preSum[row1 - 1][col2];
  }
  return this.preSum[row2][col2] - this.preSum[row1 - 1][col2] - this.preSum[row2][col1 - 1] + this.preSum[row1 - 1][col1 - 1];
};

/**
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = new NumMatrix(matrix)
 * var param_1 = obj.sumRegion(row1,col1,row2,col2)
 */
// @lc code=end
