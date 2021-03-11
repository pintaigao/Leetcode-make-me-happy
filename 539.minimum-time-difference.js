/*
 * @lc app=leetcode id=539 lang=javascript
 *
 * [539] Minimum Time Difference
 */

// @lc code=start
/**
 * @param {string[]} timePoints
 * @return {number}
 */
var findMinDifference = function (timePoints) {
  let mark = new Array(24 * 60).fill(0);
  for (let time of timePoints) {
    let t = time.split(":");
    let h = parseInt(t[0]);
    let m = parseInt(t[1]);
    if (mark[h * 60 + m]) {
      return 0;
    }
    mark[h * 60 + m] = true;
  }

  let prev = 0,
    min = Number.MAX_VALUE;
  let first = Number.MAX_VALUE,
    last = Number.MIN_VALUE;
  for (let i = 0; i < 24 * 60; i++) {
    if (mark[i]) {
      if (first != Number.MAX_VALUE) {
        min = Math.min(min, i - prev);
      }
      first = Math.min(first, i);
      last = Math.max(last, i);
      prev = i;
    }
  }

  min = Math.min(min, 24 * 60 - last + first);

  return min;
};
// @lc code=end
