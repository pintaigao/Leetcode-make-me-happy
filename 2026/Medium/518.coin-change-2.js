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
  // First we initialize a dp array of size amount + 1 with all values set to 0. This array will store the number of combinations to make up each amount from 0 to the given amount. We set dp[0] to 1 because there is one way to make up the amount of 0, which is to use no coins.
  let dp = new Array(amount + 1).fill(0);
  dp[0] = 1;
  // Next, we iterate through each coin in the coins array. For each coin, we update the dp array for all amounts from the value of the coin up to the given amount. The number of combinations to make up an amount x can be calculated by adding the number of combinations to make up the amount x - coin (which is dp[x - coin]) to the current value of dp[x]. This is because if we use the current coin, we need to find out how many ways we can make up the remaining amount (x - coin).
  for (let coin of coins) {
    // We start from the value of the coin because we cannot make up amounts smaller than the coin using that coin.
    for (let x = coin; x < amount + 1; ++x) {
      // x 代表的是amount
      // dp[x] will be updated by adding the number of combinations to make up the amount x - coin. This is because if we use the current coin, we need to find out how many ways we can make up the remaining amount (x - coin).
      dp[x] += dp[x - coin];
    }
  }

  // Finally, we return the value at dp[amount], which will give us the total number of combinations to make up the given amount using the coins provided.
  return dp[amount];
};

/* Solution 2: 回溯的方法 */
let change2 = function (amount, coins) {
  let count = 0;

  let dfs = (startIndex, sum) => {
    if (sum == amount) {
      count++;
      return;
    }

    if (sum > amount) return;

    for (let i = startIndex; i < coins.length; i++) {
      dfs(i, sum + coins[i]);
    }
  };

  dfs(0, 0);
  return count;
};
// @lc code=end

// Solution 3: 背包
var change = function (amount, coins) {
  let n = coins.length, dp = Array.from({ length: coins.length + 1 }, () => Array(amount + 1).fill(0));

  // base case
  for (let i = 0; i <= n; i++) dp[i][0] = 1;

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= amount; j++)
      if (j - coins[i - 1] >= 0)
        dp[i][j] = dp[i - 1][j] + dp[i][j - coins[i - 1]];
      else
        dp[i][j] = dp[i - 1][j];
  }
  return dp[n][amount];
};