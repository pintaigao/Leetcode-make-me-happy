/*
 * @lc app=leetcode id=518 lang=javascript
 *
 * [518] Coin Change 2
 */

// @lc code=start
/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
/* Solution 1: DP */
var change = function (amount, coins) {
  let dp = new Array(amount + 1).fill(0);
  dp[0] = 1;
  for (let coin of coins) {
    for (let x = coin; x < amount + 1; ++x) {
      dp[x] += dp[x - coin];
      console.log("now the dp is:" + dp);
    }
    console.log();
  }

  console.log(dp[amount]);
  return dp[amount];
};

/* Solution 2: 回溯的方法 */
let change = function (amount, coins) {
  let [count, path] = [0, 0];

  let dfs = (startIndex) => {
    if (path == amount) {
      count++;
      return;
    }

    if (path > amount) return;

    for (let i = startIndex; i < coins.length; i++) {
      path += coins[i];
      dfs(i);
      path -= coins[i];
    }
  };

  dfs(0);
  return count;
};
// @lc code=end
