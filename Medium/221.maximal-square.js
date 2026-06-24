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
  // 定义：以 matrix[i][j] 为右下角元素的全为 1 正方形矩阵的最大边长为 dp[i][j]。
  let m = matrix.length, n = matrix[0].length, dp = Array.from({ length: m }, () => Array(n).fill(0)), len = 0;

  // base case，第一行和第一列的正方形边长
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      dp[i][0] = matrix[i][0] - '0';
      dp[0][j] = matrix[0][j] - '0';
    }
  }


  // 进行状态转移
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][j] == '0') {
        // 值为 0 不可能是正方形的右下角
        continue;
      }
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
    }
  }


  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      len = Math.max(len, dp[i][j]);
    }
  }
  return len * len;
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
