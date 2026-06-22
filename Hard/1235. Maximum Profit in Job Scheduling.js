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

// DFS with MEMO (Timeout) O(N^2) 时间复杂度，最坏情况下每个工作都需要递归遍历剩余的工作，使用备忘录避免重复计算
var jobScheduling = function (startTime, endTime, profit) {
  let n = startTime.length, jobs = [], memo = new Array(n).fill(-1);
  for (let i = 0; i < n; i++) { jobs.push([startTime[i], endTime[i], profit[i]]) }
  jobs.sort((a, b) => a[0] - b[0]);

  // DFS with MEMO (Timeout) 方法的核心思想是对每个工作有选择地进行递归，使用备忘录避免重复计算
  // 对每个工作，有两种选择：跳过当前工作或选择当前工作
  // 跳过当前工作：直接递归下一个工作
  // 选择当前工作：找到下一个与当前工作不冲突的工作，递归计算其最大利润，然后加上当前工作的利润
  function dfs(i) {
    if (i >= n) return 0;
    if (memo[i] !== -1) return memo[i];

    const [start, end, money] = jobs[i];
    let next = i + 1;
    while (next < n && jobs[next][0] < end) { next++; }

    const skip = dfs(i + 1); // 跳过当前工作，递归计算下一个工作的最大利润
    const take = money + dfs(next); // 选择当前工作，递归计算下一个不冲突工作的最大利润

    memo[i] = Math.max(skip, take);
    return memo[i];
  }

  return dfs(0);
};

// DFS with Memo + Binary Search
var jobScheduling = function (startTime, endTime, profit) {
  let n = startTime.length, jobs = [], memo = new Array(n).fill(-1);
  for (let i = 0; i < n; i++) { jobs.push([startTime[i], endTime[i], profit[i]]) }
  jobs.sort((a, b) => a[0] - b[0]);

  function lowerBound(target) {
    let left = 0, right = n;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);

      if (jobs[mid][0] < target) {
        left = mid + 1;
      } else { // jobs[mid][0] >= target
        right = mid;
      }
    }

    return left;
  }

  function dfs(i) {
    if (i >= n) return 0;
    if (memo[i] !== -1) return memo[i];

    const [start, end, money] = jobs[i];
    // 不选当前 job
    const skip = dfs(i + 1);
    // 选当前 job，然后跳到第一个 start >= end 的 job
    const next = lowerBound(end);
    const take = money + dfs(next);

    memo[i] = Math.max(skip, take);
    return memo[i];
  }

  return dfs(0);
};


// 以上的反转，就是 DP 的方法
var jobScheduling = function (startTime, endTime, profit) {
  // dp[i] = 从第 i 个 job 开始能拿到的最大 profit
  // 多开一个位置，dp[n] = 0，表示没有 job 可以选了
  const n = startTime.length, jobs = [], dp = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) { jobs.push([startTime[i], endTime[i], profit[i]]) }
  // 按 start time 排序
  jobs.sort((a, b) => a[0] - b[0]);

  function lowerBound(target) {
    let left = 0, right = n;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);

      if (jobs[mid][0] >= target) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }

    return left;
  }

  for (let i = n - 1; i >= 0; i--) { // 每一个相当于后面已经最优了，现在前面多加一个进来，
    const [start, end, money] = jobs[i];
    const skip = dp[i + 1]; // 不选当前（当前不 take profit），即选择下一个作为当前
    const take = money + dp[lowerBound(end)]; // 当前take profit，后面哪一个和它不冲突
    dp[i] = Math.max(skip, take);
  }

  return dp[0];
};

// DP 从前往后的方法（按照 end time 排序），dp[i] 表示以第 i 个 job 作为最后一个选择的最大利润
var jobScheduling = function (startTime, endTime, profit) {
  const n = startTime.length;
  const jobs = [];

  for (let i = 0; i < n; i++) {
    jobs.push([startTime[i], endTime[i], profit[i]]);
  }

  // 注意：这里按 end time 排序
  jobs.sort((a, b) => a[1] - b[1]);
  const ends = jobs.map(job => job[1]);
  // dp[i] = 前 i 个 jobs 里面最多能赚多少钱
  const dp = new Array(n + 1).fill(0);
  function upperBound(target) {
    let left = 0, right = n;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);

      if (ends[mid] <= target) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    return left;
  }

  for (let i = 1; i <= n; i++) {
    const [start, end, money] = jobs[i - 1];

    // 找到有多少个 job 的 end <= 当前 start
    const prevCount = upperBound(start);

    const skip = dp[i - 1];
    const take = money + dp[prevCount];

    dp[i] = Math.max(skip, take);
  }

  return dp[n];
};