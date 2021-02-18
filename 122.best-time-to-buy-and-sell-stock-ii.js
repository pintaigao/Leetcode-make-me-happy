/*
 * @lc app=leetcode id=122 lang=javascript
 *
 * [122] Best Time to Buy and Sell Stock II
 */

// @lc code=start
/**
 * @param {number[]} prices
 * @return {number}
 */

// 1.Peak Valley Approach
var maxProfit = function (prices) {
  let i = 0;
  let valley = prices[0];
  let peak = prices[0];
  let maxprofit = 0;
  while (i < prices.length - 1) {
    // 前一个比后一个的数值大？先找到最低点
    while (i < prices.length - 1 && prices[i] >= prices[i + 1]) {
      i += 1;
    }
    // 底峰
    valley = prices[i];

    // 再找到后面的最高点
    while (i < prices.length - 1 && prices[i] <= prices[i + 1]) {
      i += 1;
    }
    peak = prices[i];

    maxprofit += peak - valley;
  }
  return maxprofit;
};

// 2. Simple One Pass
var maxProfit2 = function (prices) {
  let maxprofit = 0;
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) maxprofit += prices[i] - prices[i - 1];
  }
  return maxprofit;
};

maxProfit([7, 1, 5, 3, 6, 4]);
// @lc code=end
