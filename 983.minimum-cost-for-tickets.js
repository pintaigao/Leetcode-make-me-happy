/*
 * @lc app=leetcode id=983 lang=javascript
 *
 * [983] Minimum Cost For Tickets
 */

// @lc code=start
/**
 * @param {number[]} days
 * @param {number[]} costs
 * @return {number}
 */

// Approach 1: Track calendar days
var mincostTickets = function (days, costs) {
  let dp = new Array(30).fill(0);
  let d = 0; // d means the index of next travel day
  let lastday = days[days.length - 1];

  for (let i = days[0]; i <= lastday; i++) {
    if (i != days[d]) {
      dp[i % 30] = dp[(i - 1) % 30];
      console.log(dp);
      console.log();
    }
    // we don't have thid day for travel, price as yesterday
    else {
      console.log(
        "i for now is:" +
          i +
          " and first min is(dp[(i - 1) % 30]): " +
          ((i - 1) % 30) +
          " and its min cost is:" +
          (dp[(i - 1) % 30] + costs[0])
      );
      console.log(
        "second min is dp(Math.max(i - 7, 0) % 30]: " +
          (Math.max(i - 7, 0) % 30) +
          " and its min cost is:" +
          (dp[Math.max(i - 7, 0) % 30] + costs[1])
      );
      console.log(
        "third min is dp(Math.max(i - 30, 0) % 30]: " +
          (Math.max(i - 30, 0) % 30) +
          " and its min cost is:" +
          (dp[Math.max(i - 30, 0) % 30] + costs[2])
      );

      // i == days[d]
      dp[i % 30] = Math.min(
        dp[(i - 1) % 30] + costs[0],
        dp[Math.max(i - 7, 0) % 30] + costs[1],
        dp[Math.max(i - 30, 0) % 30] + costs[2]
      );

      console.log(dp);
      console.log();
      d += 1;
    }
  }

  console.log(dp[lastday % 30]);
  return dp[lastday % 30];
};

// mincostTickets([1, 4, 6, 7, 8, 9, 20, 30], [2, 7, 12]);

// 2. Track travel days
let mincostTickets2 = function (days, costs) {
  // using queue so that the oldest ticket is at the top.
  let last7days = [],
    last30days = [];

  let totalCost = 0;
  for (let i = 0; i < days.length; i++) {
    console.log("Let's see the day:" + days[i]);
    // discarding expired 7days pass

    while (last7days.length && last7days[0][0] + 7 - 1 < days[i]) {
      last7days.shift();
    }

    // 在这一天买了一张7天的票，for future（包括这一天）
    last7days.push([days[i], totalCost + costs[1]]);

    console.log(last7days);

    // discarding expired 30 days pass.
    while (last30days.length && last30days[0][0] + 30 - 1 < days[i]) {
      last30days.shift();
    }

    last30days.push([days[i], totalCost + costs[2]]);
    console.log(last30days);

    // taking the min of daily pass and current valid 7 days or 30 days pass.
    totalCost = Math.min(
      totalCost + costs[0],
      last7days[0][1],
      last30days[0][1]
    );

    console.log(totalCost);
    console.log();
  }

  return totalCost;
};

mincostTickets2([1, 4, 6, 8, 9, 20, 30], [2, 7, 12]);

// @lc code=end
