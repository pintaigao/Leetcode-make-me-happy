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
  // a,b,c代表只花1天，7天，30天的票的花费
  let lastDay = days[days.length - 1], dp = new Array(lastDay + 1).fill(0), a, b, c;

  for (let i = 0; i < days.length; i++) {
    dp[days[i]] = -1; //用-1标记表示当天去旅行
  }
  for (let i = 1; i <= lastDay; i++) {
    if (dp[i] == 0) {
      //当天不旅行
      dp[i] = dp[i - 1];
    } else if (dp[i] == -1) {
      //当天旅行, 假设当天是第一天，那么就是costs[0]，a为之前的最优解+1天票的花费
      // i-1表示前一天，前一天的最优解+1天票的花费
      if (i - 1 >= 0)
        a = dp[i - 1] + costs[0];
      // 如果i-1 < 0，表示当天是第一天(不是 i=1的第一天，是之后旅行的第一天)，那么就是costs[0]
      else a = costs[0];
      // i-7 表示 （i-7+1）的前一天，前一天的最优解+7天票的花费
      if (i - 7 >= 0)
        // 第i天，如果i-7 >= 0，i-7+1~i天的票，第i天付款，那么就是costs[1]
        // dp[i - 7] 表示的是在第i-7天，他和他前面所有旅行的最小花费
        b = dp[i - 7] + costs[1];
      else b = costs[1];
      if (i - 30 >= 0)
        // 第i天，如果i-30 >= 0，i-30 ~ i天的票，第i天付款，那么就是costs[2]
        c = dp[i - 30] + costs[2];
      // 或则c就是cover 0至i（i<30）天的票cost[2] ,只是这个值赋值给了 dp[i]
      else c = costs[2];
      dp[i] = Math.min(a, b, c); //求a,b,c的最小值
    }
  }
  return dp[lastDay];
};

// Approach 1: Track calendar 366 days
let mincostTickets4 = function (days, costs) {
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
var mincostTickets3 = function (days, costs) {
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
function mincostTickets6(days, costs) {
  let n = days.length, m = days[n - 1] + 1, [a, b, c] = costs, dp = new Array(m).fill(0);
  for (let i = 1; i < m; i++) {
    let x = days.includes(i) ? dp[i - 1] + a : dp[i - 1];
    let y = (i > 7 ? dp[i - 7] : dp[0]) + b;
    let z = (i > 30 ? dp[i - 30] : dp[0]) + c;
    dp[i] = Math.min(x, y, z);
  }
  return dp[m - 1];
}

// 倒序的 DP，不用递归
var mincostTickets7 = function (days, costs) {
  // 创建一个集合，快速判断某天是否需要旅行
  // dp数组，长度设为最后一天+31（为了处理越界）
  const lastDay = days[days.length - 1], travelDays = new Set(days), dp = new Array(lastDay + 31).fill(0);

  // 从最后一天向前计算
  for (let day = lastDay; day >= 1; day--) {
    if (!travelDays.has(day)) {
      // 如果这天不需要旅行，花费和明天一样
      dp[day] = dp[day + 1];
    } else {
      // 如果这天需要旅行，考虑三种选择
      dp[day] = Math.min(
        costs[0] + dp[day + 1], // 买1天票
        costs[1] + dp[day + 7], // 买7天票
        costs[2] + dp[day + 30] // 买30天票
      );
    }
  }

  return dp[1];
};

// 递归的DP
var mincostTickets5 = function (days, costs) {
  let memo = new Array(days.length).fill(-1);

  // dp(start) 计算 days[start..] 的最小花费
  var dp = function (start) {
    // base case
    if (start >= days.length) {
      return 0;
    }

    if (memo[start] !== -1) {
      return memo[start];
    }

    // 选择买一天的票
    let currentDay = days[start], nextDayIndex = start;
    // 以下三个while循环，都是为了找到下一个需要买票的日期（nextDayIndex）
    // 找到下一个需要买票的日期,currentDay + 1表示currentDay + 1这一天要买票，所以days[nextDayIndex] < currentDay + 1这之间的日期都不需要买票
    while (nextDayIndex < days.length && days[nextDayIndex] < currentDay + 1) {
      nextDayIndex++;
    }
    let day1Cost = dp(nextDayIndex) + costs[0];

    // 选择买七天的票
    while (nextDayIndex < days.length && days[nextDayIndex] < currentDay + 7) {
      nextDayIndex++;
    }

    let day7Cost = dp(nextDayIndex) + costs[1];

    // 选择买三十天的票
    while (nextDayIndex < days.length && days[nextDayIndex] < currentDay + 30) {
      nextDayIndex++;
    }
    let day30Cost = dp(nextDayIndex) + costs[2];

    // 计算最便宜的票
    memo[start] = Math.min(day1Cost, day7Cost, day30Cost);

    return memo[start];
  };

  let result = dp(0);

  console.log(memo);

  return result;
};

// mincostTickets5([1, 4, 6, 8, 9, 20, 30], [2, 7, 12]);
// @lc code=end


// 练习 
// This problem asks for a minimum cost, and we keep making repeated decisions like “what is the minimum cost up to this day,” so DP is a natural fit.
let mincostTickets10 = function (days, costs) {
  // First I define the state.
  // Since the problem says travel days are within 1...365, I can do DP by calendar day.
  // the minimum cost to cover all travel needs from day 1 to day d
  // This state is useful because for each day I only need to ask:
  // •	Is today a travel day?
  // •	If yes, should I buy a 1-day, 7-day, or 30-day pass?
  // So the current answer can be built from previous answers.
  let dp = new Array(days[days.length - 1] + 1).fill(0);

  // To quickly check whether a day is a travel day, I put all days into a Set, so membership check is O(1).
  for (let day of days) {
    dp[day] = -1;
  }

  for (let i = 1; i < dp.length; i++) {
    // If day d is not a travel day, I do not need to buy anything today.
    // So the minimum cost stays the same as yesterday.
    if (dp[i] == 0) {
      dp[i] = dp[i - 1];
    }
    else if (dp[i] == -1) {
      // If day d is a travel day, then this day must be covered by some pass.
      // I have three choices:
      // 1.	Buy a 1 - day pass
      // It only covers today, so the total is:
      // dp[d - 1] + costs[0]
      // 2.	Buy a 7 - day pass
      // It covers[d - 6, d]
      // So I only need the ->previous cost<- up to d - 7:
      // dp[max(0, d - 7)] + costs[1]
      // 3.	Buy a 30 - day pass
      // It covers[d - 29, d]
      // So the total is:
      // dp[max(0, d - 30)] + costs[2]
      // Then I take the minimum of the three.

      let a = dp[i - 1] + costs[0];
      let b = dp[Math.max(0, i - 7)] + costs[1];
      let c = dp[Math.max(0, i - 30)] + costs[2];
      dp[i] = Math.min(a, b, c);
    }
  }

  console.log(dp);

  return dp[dp.length - 1];
}


mincostTickets10([1, 4, 6, 8, 9, 20, 30], [2, 7, 12])

