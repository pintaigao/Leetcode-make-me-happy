/*
 * @lc app=leetcode id=11 lang=javascript
 *
 * [11] Container With Most Water
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let i = 0,
    j = height.length - 1,
    res = 0;
  while (i < j) {
    if (height[i] < height[j]) {
      res = Math.max(res, (j - i) * height[i]);
      i += 1;
    } else {
      res = Math.max(res, (j - i) * height[j]);
      j -= 1;
    }
  }
  return res;
};
// @lc code=end
