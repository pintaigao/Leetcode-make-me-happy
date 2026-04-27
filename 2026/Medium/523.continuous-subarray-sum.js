/*
 * @lc app=leetcode id=523 lang=javascript
 *
 * [523] Continuous Subarray Sum
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var checkSubarraySum = function (nums, k) {
  // 计算 nums 的前缀和
  // 前缀和与 k 的余数到索引的映射，方便快速查找所需的前缀和
  let n = nums.length, preSum = new Array(nums.length + 1).fill(0), valToIndex = new Map();
  for (let i = 1; i <= n; i++) {
    preSum[i] = preSum[i - 1] + nums[i - 1];
  }
  for (let i = 0; i < preSum.length; i++) {
    // 在哈希表中记录余数
    // 如果这个余数还没有对应的索引，则记录下来
    if (!valToIndex.has(preSum[i] % k)) {
      valToIndex.set(preSum[i] % k, i);
    }
    // 如果这个前缀和已经有对应的索引了，则什么都不做
    // 因为题目想找长度最大的子数组，所以前缀和索引应尽可能小
  }
  for (let i = 1; i < preSum.length; i++) {
    // 计算 need，使得 (preSum[i] - need) % k == 0
    if (valToIndex.has(preSum[i] % k) && i - valToIndex.get(preSum[i] % k) >= 2) {
      // 这个子数组的长度至少为 2
      return true;
    }
  }
  return false;
};
// @lc code=end

// 练习
var checkSubarraySum10 = function (nums, k) {
  let sum = 0, map = { 0: -1 };
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    let mode = sum % k

    if (map[mode] && i - made[mode] >= 2) {
      return true;
    } else {
      map[sum] = i
    }

  }

  return false;
}
