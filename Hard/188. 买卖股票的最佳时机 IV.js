var maxProfit = function (max_k, prices) {
  let n = prices.length, dp;
  if (n <= 0) {
    return 0;
  }
  // 交易次数 k 没有限制的情况, 第 122 题
  if (max_k > Math.floor(n / 2)) {
    dp = Array.from({ length: n }, () => Array(2).fill(0));
    for (let i = 0; i < n; i++) {
      if (i - 1 === -1) {
        // base case. dp[i][0] 表示第 i 天不持有股票的最大利润，dp[i][1] 表示第 i 天持有股票的最大利润
        dp[i][0] = 0;
        dp[i][1] = -prices[i];
        continue;
      }
      dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]); // 上一天不持有，今天也不持有；上一天持有，今天卖出，卖出是+，因为卖出gain profit
      dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i]); // 上一天持有，今天也持有；上一天不持有，今天买入 (不能上一天持有，今天继续买入，因为只能持有一股)
    }
    return dp[n - 1][0];
  }

  // base case：
  // dp[-1][...][0] = dp[...][0][0] = 0
  // dp[-1][...][1] = dp[...][0][1] = -infinity
  dp = Array.from({ length: n }, () => Array.from({ length: max_k + 1 }, () => Array(2).fill(0)));
  // k = 0 时的 base case
  for (let i = 0; i < n; i++) {
    dp[i][0][1] = Number.MIN_SAFE_INTEGER, dp[i][0][0] = 0;
  }

  for (let i = 0; i < n; i++) {
    for (let k = max_k; k >= 1; k--) {
      if (i - 1 === -1) {
        // 处理 i = -1 时的 base case
        dp[i][k][0] = 0;
        dp[i][k][1] = -prices[i];
        continue;
      }
      // 状态转移方程
      dp[i][k][0] = Math.max(dp[i - 1][k][0], dp[i - 1][k][1] + prices[i]);
      dp[i][k][1] = Math.max(dp[i - 1][k][1], dp[i - 1][k - 1][0] - prices[i]);
    }
  }
  // dp[n - 1][K][0]，即最后一天，最多允许 K 次交易，最多获得多少利润。
  return dp[n - 1][max_k][0];
};

// 快的方法
var maxProfit = function (k, prices) {
  const n = prices.length;
  if (n === 0 || k === 0) return 0;

  // 交易次数足够多 = 无限次交易
  if (k >= Math.floor(n / 2)) {
    let res = 0;
    for (let i = 1; i < n; i++) {
      if (prices[i] > prices[i - 1]) {
        res += prices[i] - prices[i - 1];
      }
    }
    return res;
  }

  // DP 数组
  const dp = Array.from({ length: k + 1 }, () => [-Infinity, -Infinity]);
  for (let j = 0; j <= k; j++) dp[j][0] = 0; // 0次交易，不持有 = 0

  // p of prices 也代表天
  for (let p of prices) {
    for (let j = 1; j <= k; j++) {  // 正序！！！关键
      // 卖出（这个价位不持有） Math(目前不持有的最大收益，目前持有但是卖出)
      dp[j][0] = Math.max(dp[j][0], dp[j][1] + p);
      // 买入（这个价位持有）Max（这个价位不买入，但持有之前的；这个价位再买入，也就是之前不持有（因为要先买后卖，不能先买再买））
      dp[j][1] = Math.max(dp[j][1], dp[j - 1][0] - p);
    }
  }

  return dp[k][0];
};

// 快的方法
var maxProfit = function (k, prices) {
  const buy = new Array(k).fill(-prices[0]), sell = new Array(k).fill(0);

  for (let i = 1; i < prices.length; i++) {
    // 0 代表没有交易（交易次数限制在 0）
    buy[0] = Math.max(buy[0], -prices[i]), sell[0] = Math.max(sell[0], buy[0] + prices[i]);

    // 从交易次数为1，2，3，.....次，看每天（每个 price）最大收益为多少
    for (let j = 1; j < k; j++) {
      // 如果这个价位为买，买入时最大收益会变成 Max(目前buy[j]的最大收益（即不买）；第 j-1 次卖完的钱今天买入 - 买入的价位（因为买入，所以 gain 少了）)
      // 如果这个价位为卖，卖出时最大收益会变成 Max(目前sell[j]的最大收益（即不卖）；把第 j 次买的今天卖掉 + 卖出时的价位（因为卖出，所以 gain 多了）)
      // 为什么是sell[j - 1]，因为买入必须再卖出后，所以要保证交易最多 k 次，买入时为第k 次，则上一次卖出时为 k-1次，
      // 为什么是buy[j]，因为按照题意，先买后卖（可以买入k 次再可以卖出 k 次，但是必须先买后卖），买卖发生在同一阶层，所以卖出第 k 次的时候发生在上次买入时为第 k 次的时候
      buy[j] = Math.max(buy[j], sell[j - 1] - prices[i]), sell[j] = Math.max(sell[j], buy[j] + prices[i]);
    }
  }

  return sell[k - 1];
};

//快的方法
var maxProfit = function (k, prices) {
  const len = prices.length;
  if (len === 0) return 0;
  // 只存 前一天 [持有/不持有][次数]
  let prev = Array.from({ length: 2 }, () => new Array(k + 1).fill(-Infinity));
  prev[0][0] = -prices[0];
  prev[1][0] = 0;

  for (let i = 1; i < len; i++) {
    const curr = Array.from({ length: 2 }, () => new Array(k + 1).fill(-Infinity));
    for (let c = 0; c <= k; c++) {
      // 持有
      curr[0][c] = Math.max(prev[0][c], prev[1][c] - prices[i]);
      // 不持有
      curr[1][c] = prev[1][c];
      if (c > 0) {
        curr[1][c] = Math.max(curr[1][c], prev[0][c - 1] + prices[i]);
      }
    }
    prev = curr;
  }
  return Math.max(...prev[1]);
};