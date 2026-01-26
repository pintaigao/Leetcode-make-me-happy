var maxProfit = function (prices) {
  let n = prices.length, dp = Array.from({ length: n }, () => [0, 0]);

  for (let i = 0; i < n; i++) {
    if (i - 1 === -1) {
      // base case. dp[i][0] 表示第 i 天不持有股票的最大利润，dp[i][1] 表示第 i 天持有股票的最大利润
      dp[i][0] = 0;
      dp[i][1] = -prices[i];
      continue;
    }
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]); // 上一天不持有，今天也不持有；上一天持有，今天卖出，卖出是+，因为卖出gain profit
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]); // 上一天持有，今天也持有；上一天不持有，今天买入
  }

  console.log(dp);

  return dp[n - 1][0];
};


maxProfit([7, 1, 5, 3, 6, 4]); // 7