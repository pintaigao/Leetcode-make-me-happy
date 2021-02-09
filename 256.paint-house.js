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

// 1. 强DP的写法 O(n) O(1)
var minCost = function (costs) {
  // 从下往上
  /* for (let n = costs.length - 2; n >= 0; n--) {
    // Total cost of painting the nth house red.
    costs[n][0] += Math.min(costs[n + 1][1], costs[n + 1][2]);
    // Total cost of painting the nth house green.
    costs[n][1] += Math.min(costs[n + 1][0], costs[n + 1][2]);
    // Total cost of painting the nth house blue.
    costs[n][2] += Math.min(costs[n + 1][0], costs[n + 1][1]);
  } */

  // 从上往下
  if (costs.length == 0) return 0;
  if (costs.length == 1)
    return (
      Math.min(costs[costs.length - 1][0], costs[costs.length - 1][1]),
      costs[costs.length - 1][2]
    );

  for (let n = 1; n < costs.length; n++) {
    costs[n][0] += Math.min(costs[n - 1][1], costs[n - 1][2]);
    costs[n][1] += Math.min(costs[n - 1][0], costs[n - 1][2]);
    costs[n][2] += Math.min(costs[n - 1][0], costs[n - 1][1]);
  }

  return Math.min(
    Math.min(costs[costs.length - 1][0], costs[costs.length - 1][1]),
    costs[costs.length - 1][2]
  );
};

、、 2.

minCost([
  [17, 2, 17],
  [16, 16, 5],
  [14, 3, 19],
]);
// @lc code=end
