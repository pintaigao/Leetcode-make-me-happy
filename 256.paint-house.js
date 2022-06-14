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
