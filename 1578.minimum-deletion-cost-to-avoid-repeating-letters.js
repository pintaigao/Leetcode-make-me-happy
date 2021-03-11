/*
 * @lc app=leetcode id=1578 lang=javascript
 *
 * [1578] Minimum Deletion Cost to Avoid Repeating Letters
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number[]} cost
 * @return {number}
 */

// 转换下思路：delete the same char group but leave only one max cost char
var minCost = function (s, cost) {
  let res = 0,
    max_cost = 0,
    sum_cost = 0,
    n = s.length;
  for (let i = 0; i < n; ++i) {
    if (i > 0 && s[i] != s[i - 1]) {
      res += sum_cost - max_cost;
      sum_cost = 0;
      max_cost = 0;
    }
    console.log("res is:" + res);
    sum_cost += cost[i];
    max_cost = Math.max(max_cost, cost[i]);
    console.log("sum_cost is: " + sum_cost);
    console.log("max_cost is: " + max_cost);
    console.log();
  }

  res += sum_cost - max_cost;
  return res;
};

minCost("abaac", [1, 2, 3, 4, 5]);

let minCost2 = function (s, cost) {
  let n = s.length;
  let result = 0;
  for (let i = 1; i < n; i++) {
    if (s[i] == s[i - 1]) {
      result = result + Math.min(cost[i], cost[i - 1]);
      cost[i] = Math.max(cost[i], cost[i - 1]);
    }
  }
  return result;
};
// @lc code=end
