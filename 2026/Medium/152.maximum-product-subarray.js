/*
 * @lc app=leetcode id=152 lang=javascript
 *
 * [152] Maximum Product Subarray
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */

/* Solution 1: 指针*/
var maxProduct = function (nums) {
  let [max, imax, imin] = [Number.NEGATIVE_INFINITY, 1, 1];
  for (let i = 0; i < nums.length; i++) {
    // 如果遇到负的，把正的最大值赋予给负的，以准备再遇到负数的时候重新变回正的
    if (nums[i] < 0) {
      let tmp = imax;
      imax = imin;
      imin = tmp;
    }
    imax = Math.max(imax * nums[i], nums[i]);
    // 保留最小的数，即最大的负数
    imin = Math.min(imin * nums[i], nums[i]);

    max = Math.max(max, imax);
  }
  return max;
};

// @lc code=end
