/*
 * @lc app=leetcode id=322 lang=javascript
 *
 * [322] Coin Change
 */

// @lc code=start
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  let max = amount + 1;
  let dp = new Array(amount + 1).fill(max);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (let coin of coins) {
      if (i - coin >= 0) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }

  console.log(dp);
  
  return dp[amount] > amount ? -1 : dp[amount];
};

 // 从上往下
var coinChange2 = function(coins, amount) {
 const memo = new Array(amount + 1);

  function dp(remain) {
    if (remain === 0) return 0;
    if (remain < 0) return Infinity;
    if (memo[remain]) return memo[remain];

    let min = Infinity;
    for (let coin of coins) {
      // 循环里只负责比较, 循环结束后统一写memo
      min = Math.min(min, dp(remain - coin) + 1);
    }

    // 在返回之前记入备忘录
    memo[remain] = min;
    return memo[remain];
  }

  const res = dp(amount);
  
  return res === Infinity ? -1 : res;
}
// @lc code=end

// Main Function
// let coins = [1, 2, 5], amount = 100;
let coins = [2,5,10,1], amount = 27;
let result = coinChange2(coins, amount);
console.log(result);