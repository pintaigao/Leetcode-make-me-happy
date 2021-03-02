/*
 * @lc app=leetcode id=16 lang=javascript
 *
 * [16] 3Sum Closest
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

// Approach 1: Two Pointers
// O(nlogn+n^2) = O(n^2) space: from O(logn) to O(n), depending on the implementation of the sorting algorithm.
var threeSumClosest = function (nums, target) {
  let diff = Number.MAX_VALUE,
    sz = nums.length;
  nums.sort((a, b) => a - b);

  for (let i = 0; i < sz && diff != 0; ++i) {
    let lo = i + 1,
      hi = sz - 1;
    while (lo < hi) {
      let sum = nums[i] + nums[lo] + nums[hi];
      if (Math.abs(target - sum) < Math.abs(diff)) diff = target - sum;
      // Key
      if (sum < target) lo += 1;
      else hi -= 1;
    }
  }
  return target - diff;
};

// Binary Search 的方法待看

threeSumClosest([-1, 2, 1, -4]);
// @lc code=end
