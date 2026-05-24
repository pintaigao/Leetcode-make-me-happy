var climbStairs = function (n) {
  // 备忘录
  let memo = new Array(n + 1).fill(0);

  // 定义：爬到第 n 级台阶的方法个数为 dp(n)
  // @visualize status(n)
  function dp(n) {
    // base case
    if (n <= 2) {
      return n;
    }
    if (memo[n] > 0) {
      return memo[n];
    }
    // 状态转移方程：
    // 爬到第 n 级台阶的方法个数等于爬到 n - 1 的方法个数和爬到 n - 2 的方法个数之和。
    memo[n] = dp(n - 1) + dp(n - 2);
    return memo[n];
  }

  return dp(n);
};

// 不用递归的方法
var climbStairs = function (n) {
  //dp(i)是到第i阶时的可能，从dp(1)开始
  if (n === 1) return 1
  if (n === 2) return 2
  const dp = new Array(n + 1);
  dp[1] = 1, dp[2] = 2
  //这个i不是idx了，是第i阶时的可能
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }
  return dp[n]
};