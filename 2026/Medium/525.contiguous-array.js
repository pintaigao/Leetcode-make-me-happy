/*
 * @lc app=leetcode id=525 lang=javascript
 *
 * [525] Contiguous Array
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
/* Solution 1: HashMap */
let findMaxLength = function (nums) {
  let map = { 0: -1 }, maxlen = 0, count = 0;

  for (let i = 0; i < nums.length; i++) {
    count = count + (nums[i] == 1 ? 1 : -1);
    if (map.hasOwnProperty(count)) {
      maxlen = Math.max(maxlen, i - map[count]);
    } else {
      map[count] = i;
    }
  }
  return maxlen;
};
// @lc code=end


var findMaxLength = function (nums) {
  let n = nums.length;
  let preSum = new Array(n + 1).fill(0);
  // 计算 nums 的前缀和
  for (let i = 0; i < n; i++) {
    preSum[i + 1] = preSum[i] + (nums[i] === 0 ? -1 : 1);
  }
  // 前缀和到索引的映射，方便快速查找所需的前缀和
  let valToIndex = new Map();
  let res = 0;
  for (let i = 0; i < preSum.length; i++) {
    // 如果这个前缀和还没有对应的索引，说明这个前缀和第一次出现，记录下来
    if (!valToIndex.has(preSum[i])) {
      valToIndex.set(preSum[i], i);
    } else {
      // 这个前缀和已经出现过了，则找到一个和为 0 的子数组
      res = Math.max(res, i - valToIndex.get(preSum[i]));
    }
    // 因为题目想找长度最大的子数组，所以前缀和索引应尽可能小
  }
  return res;
};
