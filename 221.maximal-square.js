/*
 * @lc app=leetcode id=221 lang=javascript
 *
 * [221] Maximal Square
 */

// @lc code=start
/**
 * @param {character[][]} matrix
 * @return {number}
 */
/* 基本DP */
var maximalSquare = function (matrix) {
  // base condition
  if (matrix == null || matrix.length < 1 || matrix[0].length < 1) return 0;

  let [height, width, maxSide] = [matrix.length, matrix[0].length, 0];

  // 相当于已经预处理新增第一行、第一列均为0
  let dp = new Array(height + 1).fill(0).map(() => new Array(width + 1).fill(0));

  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      // 如果当前位置为1，则说明当前位置potentially是一个正方形的边长
      if (matrix[row][col] == "1") {
        dp[row + 1][col + 1] = Math.min(dp[row + 1][col], dp[row][col + 1], dp[row][col]) + 1;
        maxSide = Math.max(maxSide, dp[row + 1][col + 1]);
      }
    }
  }
  return maxSide * maxSide;
};

/* DP 2 */
var maximalSquare = function (matrix) {
  let maxSideLength = 0; // 相当于纪录保持者
  let dp = new Array(matrix.length).fill(0).map(() => new Array(matrix[0].length).fill(0)); // 构建dp数组
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === "1") {
        if (i === 0 || j === 0) {
          // base case
          dp[i][j] = 1; // 第一列和第一行的dp值只能为1
        } else {
          // 递推通式，求出dp[i][j]
          dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
        }
        maxSideLength = Math.max(maxSideLength, dp[i][j]); //挑战纪录保持者，试图更新
      }
    }
  }
  return maxSideLength * maxSideLength; // 边长的平方
};
// @lc code=end
