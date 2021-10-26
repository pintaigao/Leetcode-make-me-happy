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
 * @param {number} K
 * @return {number}
 */

// 1. Priority Queue的方法 可以的方法。。。。
var findCheapestPrice = function (n, flights, src, dst, k) {
  let prices = {};
  for (let f of flights) {
    if (!prices.hasOwnProperty(f[0])) {
      prices[f[0]] = {};
    }
    prices[f[0]][f[1]] = f[2];
  }

  // It is a priority queue
  let queue = [];
  queue.push([0, src, k + 1]);
  while (queue.length) {
    let top = queue.shift();
    let price = top[0];
    let city = top[1];
    let stops = top[2];
    if (city == dst) return price;
    if (stops > 0) {
      let adj = {};
      if (prices.hasOwnProperty(city)) {
        adj = prices[city];
      }
      for (let a in adj) {
        queue.push([price + adj[a], a, stops - 1]);
      }
      queue.sort((a, b) => a[0] - b[0]);
    }
  }

  return -1;
};
// @lc code=end
