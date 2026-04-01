/*
 * @lc app=leetcode id=300 lang=javascript
 *
 * [300] Longest Increasing Subsequence
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  if (nums.length == 0) {
    return 0;
  }
  let dp = new Array(nums.length);
  dp[0] = 1;
  let maxans = 1;
  for (let i = 1; i < dp.length; i++) {
    let maxval = 0;
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        maxval = Math.max(maxval, dp[j]);
      }
    }
    dp[i] = maxval + 1;
    maxans = Math.max(maxans, dp[i]);
  }
  return maxans;
};
// @lc code=end


// 练习 自底向上的动态规划
var lengthOfLIS = function (nums) {
  // First, we create an array dp, the value on each position/index represents the length of the longest increasing subsequence that ends with that position, the element at that position. We initialize all values in dp to 1, because the minimum length of an increasing subsequence that ends with any element is 1 (the element itself).
  let dp = new Array(nums.length).fill(1);
  // Then, we iterate through the nums array. For each element at index i, we look at all the previous elements (from index 0 to i-1). If we find an element at index j that is less than the element at index i (nums[j] < nums[i]),
  // it means we can append the element at index i to the increasing subsequence that ends with the element at index j.
  // because the value of dp[j] represents the length of the longest increasing subsequence that ends with the element at index j, and since nums[i] is greater than nums[j], we can extend that subsequence by including nums[i].
  // Therefore, we update dp[i] to be the maximum of its current value or dp[j] + 1 (plus one for including nums[i]).
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      // If the current element nums[i] is greater than the previous element nums[j], we can extend the increasing subsequence that ends at index j by including nums[i].
      // Therefore, we update dp[i] to be the maximum of its current value and dp[j] + 1.
      if (nums[i] > nums[j]) {
        // 既然是递增子序列，我们只要找到前面那些结尾比 nums[i] 小的子序列，然后把 nums[i] 接到这些子序列末尾，就可以形成一个新的递增子序列，而且这个新的子序列长度加一
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  return Math.max(...dp);
}
