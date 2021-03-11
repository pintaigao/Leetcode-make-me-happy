/*
 * @lc app=leetcode id=434 lang=javascript
 *
 * [434] Number of Segments in a String
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var countSegments = function (s) {
  let segmentCount = 0;

  for (let i = 0; i < s.length; i++) {
    if ((i == 0 || s[i - 1] == " ") && s[i] != " ") {
      segmentCount += 1;
    }
  }

  return segmentCount;
};
// @lc code=end
