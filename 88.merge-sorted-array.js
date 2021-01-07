/*
 * @lc app=leetcode id=88 lang=javascript
 *
 * [88] Merge Sorted Array
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */

//  从后往前
var merge = function (nums1, m, nums2, n) {
  // 正确的index
  m = m - 1;
  n = n - 1;
  let i = nums1.length - 1;
  while (i >= 0) {
    if (n > -1 && m > -1 && nums1[m] >= nums2[n]) {
      nums1[i] = nums1[m];
      nums1[m] = nums2[n];
      m = m - 1;
    } else if (n > -1) {
      nums1[i] = nums2[n--];
    }
    i = i - 1;
  }
};
// @lc code=end
