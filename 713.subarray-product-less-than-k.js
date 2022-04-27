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

/* Solution 1: Sliding Window */
var numSubarrayProductLessThanK = function (nums, k) {
  if (k <= 1) return 0;
  let [prod, ans, left] = [1, 0, 0];
  for (let right = 0; right < nums.length; right++) {
    prod *= nums[right];
    while (prod >= k) {
      prod /= nums[left];
      left += 1;
    }
    //每多加一个数字，就会产生right - left + 1个子数组，因为比如说[1,2]多加一个3，子数组多了[3],[3,2],[3,2,1]，所以多了3个，
    ans += right - left + 1;
  }
  return ans;
};
// @lc code=end
