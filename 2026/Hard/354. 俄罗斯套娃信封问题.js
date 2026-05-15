/**
 * @param {number[][]} envelopes
 * @return {number}
 */
var maxEnvelopes = function (envelopes) {
  // 按第一位递增，第二位递减
  envelopes.sort((a, b) => a[0] !== b[0] ? a[0] - b[0] : b[1] - a[1]);

  let dp = new Array(envelopes.length).fill(1);

  for (let i = 0; i < envelopes.length; i++) {
    for (let j = 0; j < i; j++) {
      if (envelopes[i][0] > envelopes[j][0] && envelopes[i][1] > envelopes[j][1]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  return lengthOfLIS(dp);
};

var lengthOfLIS = function (nums) {
  let piles = 0, n = nums.length, top = new Array(nums.length);
  for (let i = 0; i < n; i++) {
    // 要处理的扑克牌
    let poker = nums[i], left = 0, right = piles;
    // 二分查找插入位置
    while (left < right) {
      let mid = Math.floor((left + right) / 2);
      if (top[mid] >= poker)
        right = mid;
      else
        left = mid + 1;
    }
    if (left === piles) piles++;
    // 把这张牌放到牌堆顶
    top[left] = poker;
  }
  // 牌堆数就是 LIS 长度
  console.log(piles);

  return piles;
}

// 看这个
var maxEnvelopes = function (envelopes) {
  // 对高度数组寻找 LIS
  let n = envelopes.length, height = new Array(n);
  // 按宽度升序排列，如果宽度一样，则按高度降序排列
  envelopes.sort((a, b) => a[0] === b[0] ? b[1] - a[1] : a[0] - b[0]);

  for (let i = 0; i < n; i++) height[i] = envelopes[i][1]

  // 接下来的问题就是找递增envelopes[1]序列
  return lengthOfLIS(height);
};

// 返回 nums 中 LIS 的长度
var lengthOfLIS = function (nums) {
  let piles = 0, n = nums.length, top = new Array(n);
  for (let i = 0; i < n; i++) {
    // 要处理的扑克牌
    let poker = nums[i], left = 0, right = piles;
    // 二分查找插入位置
    while (left < right) {
      let mid = Math.floor((left + right) / 2);
      if (top[mid] >= poker)
        right = mid;
      else
        left = mid + 1;
    }
    if (left === piles) piles++;
    // 把这张牌放到牌堆顶
    top[left] = poker;
  }
  // 牌堆数就是 LIS 长度
  return piles;
};

// 优雅的方法
var maxEnvelopes = function (envelopes) {
  // 双关键字排序：宽度升序，高度降序
  envelopes.sort((a, b) => a[0] - b[0] || b[1] - a[1]);

  // 300. 最长递增子序列
  const g = [];
  for (const [, h] of envelopes) {
    // 二分查找 g 中第一个 >= h 的位置
    const j = _.sortedIndex(g, h);
    if (j < g.length) {
      g[j] = h;
    } else {
      g.push(h);
    }
  }
  return g.length;
};

maxEnvelopes([[15, 8], [2, 20], [2, 14], [4, 17], [8, 19], [8, 9], [5, 7], [11, 19], [8, 11], [13, 11], [2, 13], [11, 19], [8, 11], [13, 11], [2, 13], [11, 19], [16, 1], [18, 13], [14, 17], [18, 19]]);

