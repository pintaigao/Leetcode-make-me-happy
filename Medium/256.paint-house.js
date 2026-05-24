/*
 * @lc app=leetcode id=256 lang=javascript
 *
 * [256] Paint House
 */

// @lc code=start
/**
 * @param {number[][]} costs
 * @return {number}
 */

/* DP 从上往下*/
var minCost = function (costs) {
  if (costs.length == 0) return 0;
  if (costs.length == 1) return Math.min(...costs[costs.length - 1]);

  for (let n = 1; n < costs.length; n++) {
    // 这一行，如果选择了第一个房子，那么上一行不能选同样的房子，剩下两个房子选花费最小的
    costs[n][0] += Math.min(costs[n - 1][1], costs[n - 1][2]);
    costs[n][1] += Math.min(costs[n - 1][0], costs[n - 1][2]);
    costs[n][2] += Math.min(costs[n - 1][0], costs[n - 1][1]);
  }

  return Math.min(...costs[costs.length - 1]);
};
// @lc code=end

// 真正的 DP 格式
var minCost = function (costs) {
  const n = costs.length;
  // 定义：当第 i 个房子粉刷颜色 j 时，粉刷 [0..i] 这些房子所需的最少花费为 dp[i][j]
  // 其中 j = 0, 1, 2 分别代表三种颜色
  const dp = new Array(n).fill().map(() => new Array(3).fill(0));

  // base case
  for (let j = 0; j < 3; j++) {
    // 粉刷第一个房子的花费是确定的
    dp[0][j] = costs[0][j];
  }

  // 状态转移，穷举所有「选择」
  for (let i = 1; i < n; i++) {
    // 颜色 0 只能挨着颜色 1 或颜色 2
    dp[i][0] = Math.min(dp[i - 1][1], dp[i - 1][2]) + costs[i][0];
    // 颜色 1 只能挨着颜色 0 或颜色 2
    dp[i][1] = Math.min(dp[i - 1][0], dp[i - 1][2]) + costs[i][1];
    // 颜色 2 只能挨着颜色 0 或颜色 1
    dp[i][2] = Math.min(dp[i - 1][0], dp[i - 1][1]) + costs[i][2];
  }

  // 计算题目要求的结果，
  let res = Infinity;
  for (let j = 0; j < 3; j++) {
    res = Math.min(res, dp[n - 1][j]);
  }

  return res;
};