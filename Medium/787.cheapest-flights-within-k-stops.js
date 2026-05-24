/*
 * @lc app=leetcode id=787 lang=javascript
 *
 * [787] Cheapest Flights Within K Stops
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number[][]} flights
 * @param {number} src
 * @param {number} dst
 * @param {number} k
 * @return {number}
 */

/*n个城市，flights 城市到城市的价格，出发城市 src，目的地 dst， 最多经过k站中转*/

/* Solution 1：动态规划1，使用二维数组进行状态转移 */
var findCheapestPrice1 = function (n, flights, src, dst, k) {
  const f = new Array(k + 2).fill(0).map(() => new Array(n).fill(Infinity));
  f[0][src] = 0;

  for (let t = 1; t <= k + 1; ++t) {
    for (const flight of flights) {
      const [j, i, cost] = [flight[0], flight[1], flight[2]];
      f[t][i] = Math.min(f[t][i], f[t - 1][j] + cost);
      console.log(f);
    }
  }
  let ans = Infinity;
  for (let t = 1; t <= k + 1; ++t) {
    ans = Math.min(ans, f[t][dst]);
  }
  return ans == Infinity ? -1 : ans;
};

findCheapestPrice1(
  3,
  [
    [0, 1, 100],
    [1, 2, 100],
    [0, 2, 500],
  ],
  0,
  2,
  1
);

var findCheapestPrice2 = function (n, flights, src, dst, k) {
  let dp = new Array(n).fill(Infinity);
  dp[src] = 0;
  for (let i = 0; i <= k; i++) {
    let temp = dp.slice();
    for (let [from, to, cost] of flights) {
      temp[to] = Math.min(temp[to], dp[from] + cost);
    }
    dp = temp;
  }
  return dp[dst] === Infinity ? -1 : dp[dst];
};
// @lc code=end
