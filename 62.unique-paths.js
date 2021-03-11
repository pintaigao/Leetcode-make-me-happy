/*
 * @lc app=leetcode id=62 lang=javascript
 *
 * [62] Unique Paths
 */
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */

// Approach 1: Dynamic Programming O(N*M) O(N*e M)
var uniquePaths = function (m, n) {
  let dp = new Array(m).fill(0).map((pos) => {
    return new Array(n).fill(1);
  });

  for (let col = 1; col < m; ++col) {
    for (let row = 1; row < n; ++row) {
      dp[col][row] = dp[col - 1][row] + dp[col][row - 1];
    }
  }

  return dp[m - 1][n - 1];
};

// uniquePaths(7, 3);
