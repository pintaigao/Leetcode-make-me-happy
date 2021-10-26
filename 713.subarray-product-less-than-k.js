/*
 * @lc app=leetcode id=713 lang=javascript
 *
 * [713] Subarray Product Less Than K
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

// Approach #2: Sliding Window O(N) O(1)
var numSubarrayProductLessThanK = function (nums, k) {
  if (k <= 1) return 0;
  let prod = 1,
    ans = 0,
    left = 0;
  for (let right = 0; right < nums.length; right++) {
    prod *= nums[right];
    while (prod >= k) prod /= nums[left++];
    // Each step introduces x new subarrays, where x is the size of the current window (j + 1 - i);
    ans += right - left + 1;
  }
  return ans;
};
// @lc code=end
