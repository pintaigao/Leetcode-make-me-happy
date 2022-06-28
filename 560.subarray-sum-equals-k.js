/*
 * @lc app=leetcode id=560 lang=javascript
 *
 * [560] Subarray Sum Equals K
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
  const [map, prefixSum, count] = [{ 0: 1 }, 0, 0];

  for (let i = 0; i < nums.length; i++) {
    prefixSum += nums[i];

    // 如果map中有到目前为止的sum-k这个值，说明prefixSum-k的那些num + 目前这个可以凑成一组，则看凑成prefixSum-k有多少组
    if (map[prefixSum - k]) {
      count += map[prefixSum - k];
    }

    // 到目前为止的值有吗，有，个数+1（说明又有一组subarray等于prefixSum），没有就为1（说明有一组subarray等于prefixSum）
    map[prefixSum] = (map[prefixSum] || 0) + 1;
  }
  return count;
};
// @lc code=end
