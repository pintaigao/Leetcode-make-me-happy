/*
 * @lc app=leetcode id=1004 lang=javascript
 *
 * [1004] Max Consecutive Ones III
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// Sliding Window, Two Pointers
// 对于每个 A[j]，尝试找到最长的子数组。
// If A[i] ~ A[j] has zeros <= K, we continue to increment j.
// 如果 A[i] ~ A[j] 包含的 0 <= K，那么我们继续增加 j。
// If A[i] ~ A[j] has zeros > K, we increment i (as well as j).
// 如果 A[i] ~ A[j] 包含的 0 > K，那么我们继续增加 i (as well as j)。
var longestOnes = function (A, K) {
  // 设立两个指针
  let left = 0,
    right;
  let result = 0;
  for (right = 0; right < A.length; right++) {
    // 如果我们在窗口中包含了 0，那么我们减少了 K 的值。
    // 由于 K 是窗口中允许的最大的零的数量。
    if (A[right] == 0) K -= 1;
    // 如果 K < 0，窗口中的零的数量大于允许的零的数量，因此left往右移。
    if (K < 0) {
      // 如果A[left] == 0，K = K+1, 抛弃A[left]上的0
      if (A[left] == 0) K += 1;
      left += 1;
    }
    // 更新结果
    result = Math.max(result, right - left + 1);
  }
  return result;
};

// Sliding Window 更好懂的方法
let longestOnes2 = function (nums, k) {
  let maxLen = 0;
  // lo hi两个指针
  for (let lo = 0, hi = 0, zeros = 0; hi < nums.length; hi++) {
    // count zeros的数目
    zeros += nums[hi] == 0 ? 1 : 0;
    // 如果zeros > k，那么我们需要抛弃窗口中的最左边的元素,直至窗口内的 00 的个数小于等于 KK 为止。
    if (zeros > k) {
      zeros -= nums[lo] == 0 ? 1 : 0;
      lo++;
    } else {
      maxLen = Math.max(hi - lo + 1, maxLen);
    }
  }
  return maxLen;
};
// @lc code=end
