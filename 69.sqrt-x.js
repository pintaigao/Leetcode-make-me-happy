/*
 * @lc app=leetcode id=69 lang=javascript
 *
 * [69] Sqrt(x)
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */

// Binary Search
var mySqrt = function (x) {
  if (x < 2) return x;

  let num;
  let pivot,
    left = 2,
    right = parseInt(x / 2);
  while (left <= right) {
    pivot = left + parseInt((right - left) / 2);
    num = pivot * pivot;
    if (num > x) right = pivot - 1;
    else if (num < x) left = pivot + 1;
    else return pivot;
  }

  return right;
};
// @lc code=end
