/*
 * @lc app=leetcode id=1004 lang=javascript
 *
 * [1004] Max Consecutive Ones III
 */

// @lc code=start
/**
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */

// Sliding Window
// For each A[j], try to find the longest subarray.
// If A[i] ~ A[j] has zeros <= K, we continue to increment j.
// If A[i] ~ A[j] has zeros > K, we increment i (as well as j).

var longestOnes = function (A, K) {
  let left = 0,
    right;
  for (right = 0; right < A.length; right++) {
    // If we included a zero in the window we reduce the value of K.
    // Since K is the maximum zeros allowed in a window.
    if (A[right] == 0) K -= 1;
    // A negative K denotes we have consumed all allowed flips and window has
    // more than allowed zeros, thus increment left pointer by 1 to keep the window size same.
    if (K < 0) {
      // If the left element to be thrown out is zero we increase K.
      if (A[left] == 0) K += 1;
      left += 1;
    }
  }
  return right - left;
};

// Sliding Window 更好懂的方法
let longestOnes2 = function (nums, k) {
  let maxLen = 0;
  for (let lo = 0, hi = 0, zeros = 0; hi < nums.length; hi++) {
    zeros += nums[hi] == 0 ? 1 : 0;
    if (zeros > k) {
      zeros -= nums[lo++] == 0 ? 1 : 0;
    }
    maxLen = Math.max(hi - lo + 1, maxLen);
  }
  return maxLen;
};
// @lc code=end
