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

// 自订向下
var coinChange2 = function (coins, amount) {
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
let coins = [2, 5, 10, 1], amount = 27;
let result = coinChange2(coins, amount);
console.log(result);

// 练习
// I would first think about this recursively.
// This problem can be broken down from the perspective of the last step.
var coinChange = function (coins, amount) {
  // I’ll define a recursive function:
  // What does dp(amount) mean? It means the minimum number of coins needed to make up the amount.
  // What it does: it tries every coin, and for each coin, it recursively computes the minimum number of coins needed to make up the remaining amount (amount - coin). Then it takes the minimum among all possibilities and adds one (for the current coin).
  function dp(coins, amount) {
    // Add the base case first, which is the simplest case that can be solved directly.
    // If remain === 0, that means I have formed the amount exactly, so I need 0 more coins
    // If remain < 0, that means this path is invalid, so I return something impossible, like Infinity
    if (amount === 0) return 0;
    if (amount < 0) return -1;

    let res = Number.MAX_SAFE_INTEGER;

    // At here I will add the core recursive transition, which is to try every coin and see which one leads to the optimal solution.
    // 这里可以带备忘录优化, 但是为了练习, 先不加
    for (let coin of coins) {
      // 计算子问题的结果
      // For each coin, I recursively compute:
      let subProblem = dp(coins, amount - coin);
      // 子问题无解则跳过
      // The +1 represents the current coin itself.
      // Then I take the minimum among all possibilities.
      if (subProblem === -1) continue;
      // 在子问题中选择最优解，然后加一
      res = Math.min(res, subProblem + 1);
    }

    return res === Number.MAX_SAFE_INTEGER ? -1 : res;
  }
  return dp(coins, amount);
}

// 带备忘录
var coinChange = function (coins, amount) {
  let memo = new Array(amount + 1).fill(-666);
  // 题目要求的最终结果是 dp(amount)
  // 定义：要凑出目标金额 amount，至少要 dp(coins, amount) 个硬币
  function dp(coins, amount) {
    // base case
    if (amount === 0) return 0;
    if (amount < 0) return -1;

    // 查备忘录, 避免重复计算
    if (memo[amount] !== -666) {
      return memo[amount];
    }

    let res = Number.MAX_SAFE_INTEGER;

    for (let coin of coins) {
      // 计算子问题的结果
      let subProblem = dp(coins, amount - coin);
      // 子问题无解则跳过
      if (subProblem === -1) continue;
      // 在子问题中选择最优解，然后加一
      res = Math.min(res, subProblem + 1);
    }

    // 把计算结果存入备忘录
    memo[amount] = res === Number.MAX_SAFE_INTEGER ? -1 : res;

    return memo[amount];
  }
  return dp(coins, amount);
}