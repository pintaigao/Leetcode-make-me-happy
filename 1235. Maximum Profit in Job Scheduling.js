/**
 * @param {number[]} startTime
 * @param {number[]} endTime
 * @param {number[]} profit
 * @return {number}
 */
function jobScheduling(startTime, endTime, profit) {
  const jobs = []; // 存储工作信息的数组
  const n = startTime.length; // 工作数量

  // 将工作信息存储到 jobs 数组中
  for (let i = 0; i < n; i++) {
    jobs.push({ start: startTime[i], end: endTime[i], profit: profit[i] });
  }

  // 按照结束时间从小到大对 jobs 数组进行排序
  jobs.sort((a, b) => a.end - b.end);

  const dp = new Array(n); // 动态规划数组，存储选择每个工作时的最大利润

  // 初始条件：选择第一个工作时的最大利润即为该工作的利润
  dp[0] = jobs[0].profit;

  // 遍历每个工作，填充动态规划数组
  for (let i = 1; i < n; i++) {
    const prev = findLastNonConflict(jobs, i); // 找到在当前工作之前最晚结束的工作的索引
    const prevProfit = prev >= 0 ? dp[prev] : 0; // 获取最晚结束工作的最大利润
    dp[i] = Math.max(dp[i - 1], prevProfit + jobs[i].profit); // 计算选择当前工作时的最大利润
  }

  return dp[n - 1]; // 返回最大总利润

  // 辅助函数：找到在当前工作之前最晚结束的工作的索引
  function findLastNonConflict(jobs, i) {
    for (let j = i - 1; j >= 0; j--) {
      if (jobs[j].end <= jobs[i].start) {
        return j;
      }
    }
    return -1;
  }
}

// 二分查找的方法
function jobScheduling(startTime, endTime, profit) {
  const n = startTime.length;
  const jobs = new Array(n);

  // 将工作信息存储到 jobs 数组中
  for (let i = 0; i < n; i++) {
    jobs[i] = { start: startTime[i], end: endTime[i], profit: profit[i] };
  }

  // 按照结束时间从小到大排序
  jobs.sort((a, b) => a.end - b.end);

  const dp = new Array(n);
  dp[0] = jobs[0].profit;

  // 遍历每个工作，填充动态规划数组
  for (let i = 1; i < n; i++) {
    const prev = binarySearch(jobs, i); // 使用二分法找到最晚结束的工作
    const prevProfit = prev >= 0 ? dp[prev] : 0; // 获取最晚结束工作的最大利润
    dp[i] = Math.max(dp[i - 1], prevProfit + jobs[i].profit); // 计算选择当前工作时的最大利润
  }

  // 二分查找辅助函数，找到当前工作之前最晚结束的工作的索引
  function binarySearch(jobs, i) {
    let low = 0, high = i - 1;
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      if (jobs[mid].end <= jobs[i].start) {
        if (jobs[mid + 1].end <= jobs[i].start) {
          low = mid + 1;
        } else {
          return mid;
        }
      } else {
        high = mid - 1;
      }
    }
    return -1;
  }

  return dp[n - 1]; // 返回最大总利润
}

// 示例用法
const startTime = [1, 2, 3, 3];
const endTime = [3, 4, 5, 6];
const profit = [50, 10, 40, 70];

const result = jobScheduling(startTime, endTime, profit);
console.log(result); // 输出最大总利润
