/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  const dp = new Array(amount + 1);
  dp.fill(Number.MAX_VALUE);
  // 达到amount 的coin 最少的硬币数量
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    console.log("Now i is: " + i);
    for (let j = 0; j < coins.length; j++) {
      if (i - coins[j] >= 0) {
        console.log("Yes i - coins[j] is > 0 and coins[j] is: " + coins[j]);
        dp[i] = Math.min(dp[i - coins[j]] + 1, dp[i]);
        console.log(dp);

      }
    }
  }
  return dp[amount] === Number.MAX_VALUE ? -1 : dp[amount];
};

coinChange([1, 2, 5], 11);
