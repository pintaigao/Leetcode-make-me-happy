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


// Sort: 时间复杂度 O((m+n)log(m+n))，空间复杂度 O(log(m+n))
var merge = function (nums1, m, nums2, n) {
  // 正确的index
  for（let i = m; i < m + n; i++) {
    nums1[i] = nums2[i - m];
  }

  nums1.sort((a, b) => a - b);

  return nums1;
}

// 正向双指针
var merge1 = function (nums1, m, nums2, n) {
  let p1 = 0, p2 = 0, sorted = new Array(m + n).fill(0), cur;
  while (p1 < m || p2 < n) {
    if (p1 === m) {
      cur = nums2[p2++];
    } else if (p2 === n) {
      cur = nums1[p1++];
    } else if (nums1[p1] < nums2[p2]) {
      cur = nums1[p1++];
    } else {
      cur = nums2[p2++];
    }

    sorted[p1 + p2 - 1] = cur;
  }
  for (let i = 0; i != m + n; ++i) {
    nums1[i] = sorted[i];
  }
};

// 逆向双指针
var merge2 = function (nums1, m, nums2, n) {
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
      nums1[i] = nums2[n];
      n -= 1;
    }
    i = i - 1;
  }
};
// @lc code=end
