var knapsack = function (W, wt, val) {
  // base case 已初始化
  let N = wt.length, dp = new Array(wt.length + 1).fill().map(() => new Array(wt.length + 1).fill(0));
  for (let i = 1; i <= N; i++) {
    for (let w = 1; w <= W; w++) {
      if (w - wt[i - 1] < 0) {
        // 这种情况下只能选择不装入背包
        dp[i][w] = dp[i - 1][w];
      } else {
        // 装入或者不装入背包，择优
        dp[i][w] = Math.max(dp[i - 1][w - wt[i - 1]] + val[i - 1], dp[i - 1][w]);
      }
    }
  }

  return dp[N][W];
};