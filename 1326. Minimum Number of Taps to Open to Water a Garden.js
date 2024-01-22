/**
 * @param {number} n - 花园的长度
 * @param {number[]} ranges - 水龙头的位置和覆盖范围数组
 * @return {number} - 最少需要打开的水龙头数量
 */

// 动态规划
function minTaps(n, ranges) {
  // 初始化dp数组，表示在位置i上的花园所需的最少水龙头数量
  const dp = new Array(n + 1).fill(Infinity);

  // 初始时，在位置0上不需要水龙头
  dp[0] = 0;

  // 遍历水龙头的位置和覆盖范围
  for (let i = 0; i <= n; i++) {
    // 为了确保每个水龙头的覆盖范围始终在花园的有效边界内
    // 当前水龙头的位置
    const left = Math.max(0, i - ranges[i]);
    // 当前水龙头的覆盖范围
    const right = Math.min(n, i + ranges[i]);

    // 更新dp数组，使得在覆盖范围内所需的水龙头数量最小
    for (let j = left; j <= right; j++) {
      dp[j] = Math.min(dp[j], dp[left] + 1);
    }
  }

  console.log(dp);

  // 返回dp数组的最后一个元素，即为最少需要打开的水龙头数量
  return dp[n] === Infinity ? -1 : dp[n];
}

// 测试
const n = 5;
const ranges = [0, 1, 0, 0, 1, 0];
const result = minTaps(n, ranges);
console.log(result);

// 贪心算法
var minTaps2 = function (n, ranges) {
  // 初始化一个数组 'rightMost' 来记录每个点可以覆盖到的最远右端点
  const rightMost = new Array(n + 1).fill(0).map((_, i) => i);

  // 遍历每个水龙头
  for (let i = 0; i <= n; i++) {
    // 计算每个水龙头覆盖范围的起始点
    const start = Math.max(0, i - ranges[i]);
    // 计算每个水龙头覆盖范围的结束点
    const end = Math.min(n, i + ranges[i]);
    // 更新起始点可以达到的最远距离
    rightMost[start] = Math.max(rightMost[start], end);
  }

  // 初始化 'last' 为当前能覆盖到的最远距离，'ret' 为所需的水龙头数量，'pre' 为前一个水龙头的最远覆盖距离
  let last = 0, ret = 0, pre = 0;

  // 遍历每个点来确定所需的最少水龙头数量
  for (let i = 0; i < n; i++) {
    // 更新当前可以覆盖到的最远距离
    last = Math.max(last, rightMost[i]);
    // 如果当前点等于最远覆盖距离，则无法覆盖整个区域
    if (i === last) {
      return -1;
    }
    // 如果当前点达到了前一个水龙头的最远覆盖距离
    if (i === pre) {
      // 需要增加一个水龙头
      ret++;
      // 更新前一个水龙头的最远覆盖距离
      pre = last;
    }
  }
  // 返回所需的最少水龙头数量
  return ret;
};