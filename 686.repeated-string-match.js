/*
 * @lc app=leetcode id=686 lang=javascript
 *
 * [686] Repeated String Match
 */

// @lc code=start
/**
 * @param {string} a
 * @param {string} b
 * @return {number}
 */
var repeatedStringMatch = function (a, b) {
  let count = 0;
  let sb = "";
  while (sb.length < b.length) {
    sb += a;
    count++;
  }
  if (sb.includes(b)) return count;
  if ((sb + a).includes(b)) return count + 1;
  return -1;
};
// @lc code=end
