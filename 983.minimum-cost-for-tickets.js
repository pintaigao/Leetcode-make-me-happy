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

// Approach 1:逆着来看，一张4~10天的票，我第10天付款，https://leetcode-cn.com/problems/minimum-cost-for-tickets/comments/67361
let mincostTickets = function (days, costs) {
  let lastDay = days[days.length - 1];
  let dp = new Array(lastDay + 1).fill(0);
  // a,b,c代表只花1天，7天，30天的票的花费
  let a, b, c;

  for (let i = 0; i < days.length; i++) {
    dp[days[i]] = -1; //用-1标记表示当天去旅行
  }
  for (let i = 1; i <= lastDay; i++) {
    if (dp[i] == 0) {
      //当天不旅行
      dp[i] = dp[i - 1];
    } else if (dp[i] == -1) {
      //当天旅行, 假设当天是第一天，那么就是costs[0]
      a = dp[i - 1] + costs[0];
      if (i - 7 >= 0)
        // 第i天，如果i-7 >= 0，i-7+1~i天的票，第i天付款，那么就是costs[1]
        // dp[i - 7] 表示的是在第i-7天，他和他前面所有旅行的最小花费
        b = dp[i - 7] + costs[1];
      else b = costs[1];
      if (i - 30 >= 0)
        // 第i天，如果i-30 >= 0，i-30 ~ i天的票，第i天付款，那么就是costs[2]
        c = dp[i - 30] + costs[2];
      else c = costs[2];
      dp[i] = min(a, b, c); //求a,b,c的最小值
    }
  }
  return dp[lastDay];
};

// Approach 1: Track calendar 366 days
let mincostTickets3 = function (days, costs) {
  // 将从新年到某一天的花过的所有钱数全部记录起来。
  let lastAllDaysCost = new Array(366).fill(0);
  //  days的下标，确保遍历365天时，以便于知道下次旅游的日期。
  let dayIdx = 0;
  // 日，月，年的花费。
  let ticketDay = costs[0];
  let ticketWeek = costs[1];
  let ticketMonth = costs[2];
  // 因为是第一天，所以过去的总花费为0
  lastAllDaysCost[0] = 0;
  // lastAllCost[i] 是截至到今年的第 i 天的总花费.

  // 模拟新年的第一天跑到旅行的最后一天。
  for (let today = 1; today <= 365; today++) {
    if (dayIdx >= days.length) {
      break;
    }
    // 判断今天是否属于旅行日。
    if (today == days[dayIdx]) {
      // 如果一月前，买了月票，会不会更便宜？
      // 如果一周前，买了周票，会不会更便宜？
      // 如果都不会的话，那我暂时先买日票试试呗。
      lastAllDaysCost[today] = Math.min(
        lastAllDaysCost[Math.max(0, today - 1)] + ticketDay,
        lastAllDaysCost[Math.max(0, today - 7)] + ticketWeek,
        lastAllDaysCost[Math.max(0, today - 30)] + ticketMonth
      );

      // 开始等待下一个待旅行的日子到来。
      dayIdx++;
    } else {
      // 如果这一天不旅行那么直接把上一天的过去总花费拿过来直接使用。
      lastAllDaysCost[today] = lastAllDaysCost[today - 1];
    }
  }
  return lastAllDaysCost[days[days.length - 1]];
};

// Approach 2: Track calendar 30 days
var mincostTickets2 = function (days, costs) {
  let dp = new Array(30).fill(0);

  let d = 0; // d means the index of next travel day
  let lastday = days[days.length - 1];

  // 解释下面的逻辑：
  // 如果days[d] < lastday，那么就是一个新的日期，那么就要更新dp[days[d] % 30]
  // 如果days[d] >= lastday，那么就是一个旧的日期，那么就不用更新dp[days[d] % 30]
  // 因为旧的日期，那么就不会影响到新的日期的计算
  // 所以，只要更新dp[days[d] % 30]，就可以了
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

mincostTickets([1, 4, 6, 7, 8, 9, 20, 30], [2, 7, 12]);

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

// 超简洁的代码 https://leetcode-cn.com/problems/minimum-cost-for-tickets/solution/zui-hao-li-jie-de-yi-wei-dong-tai-gui-hu-0owd/
function mincostTickets(days, costs) {
  const n = days.length,
    m = days[n - 1] + 1;
  const [a, b, c] = costs;
  let dp = new Array(m).fill(0);
  for (let i = 1; i < m; i++) {
    let x = days.includes(i) ? dp[i - 1] + a : dp[i - 1];
    let y = (i > 7 ? dp[i - 7] : dp[0]) + b;
    let z = (i > 30 ? dp[i - 30] : dp[0]) + c;
    dp[i] = Math.min(x, y, z);
  }
  return dp[m - 1];
}

mincostTickets2([1, 4, 6, 8, 9, 20, 30], [2, 7, 12]);
// @lc code=end
