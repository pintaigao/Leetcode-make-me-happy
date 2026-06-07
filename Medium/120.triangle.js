/*
 * @lc app=leetcode id=120 lang=javascript
 *
 * [120] Triangle
 */

// @lc code=start
/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function (triangle) {
  var n = triangle.length;
  // 定义：走到第 i 行第 j 个元素的最小路径和是 dp[i][j]
  var dp = new Array(n).fill(null).map(() => new Array(n).fill(Infinity));
  // base case
  dp[0][0] = triangle[0][0];
  // 进行状态转移
  for (var i = 1; i < n; i++) {
    // 每一行从第一个元素开始更新，直到最后一个元素
    for (var j = 0; j < triangle[i].length; j++) {
      // 状态转移方程
      // 第一个元素
      if (j == 0) {
        dp[i][j] = dp[i - 1][j] + triangle[i][j];
      }
      // 从第二个元素往后
      if (j - 1 >= 0) {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - 1]) + triangle[i][j];
      }
    }
  }
  // 找出落到最后一层的最小路径和
  return Math.min(...dp[n - 1]);
};
// @lc code=end

