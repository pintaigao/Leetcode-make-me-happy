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
  let string = "";
  while (string.length < b.length) {
    string += a;
    count++;
  }
  // 如果新的字符串包括了b，则返回count
  if (string.includes(b)) return count;
  //
  if ((string + a).includes(b)) return count + 1;
  return -1;
};
// @lc code=end
