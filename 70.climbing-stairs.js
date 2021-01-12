/*
 * @lc app=leetcode id=70 lang=javascript
 *
 * [70] Climbing Stairs
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */

// 1.Recursion with Memoization
// let climbStairs = function (n) {
//   let memo = new Array(n + 1);
//   return climb_Stairs(0, n, memo);
// };

// let climb_Stairs = function (i, n, memo) {
//   if (i > n) {
//     return 0;
//   }
//   if (i == n) {
//     return 1;
//   }
//   if (memo[i] > 0) {
//     return memo[i];
//   }
//   memo[i] = climb_Stairs(i + 1, n, memo) + climb_Stairs(i + 2, n, memo);
//   return memo[i];
// };

// 2. DP
let climbStairs = function (n) {
  if (n == 1) {
    return 1;
  }
  let dp = new Array(n + 1);
  dp[1] = 1;
  dp[2] = 2;
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
};

// @lc code=end
