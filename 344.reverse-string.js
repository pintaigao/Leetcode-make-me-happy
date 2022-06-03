/*
 * @lc app=leetcode id=344 lang=javascript
 *
 * [344] Reverse String
 */

// @lc code=start
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function (s) {
  let [left, right] = [0, s.length - 1];
  while (left < right) {
    let tmp = s[left];
    s[left++] = s[right];
    s[right--] = tmp;
  }
};
// @lc code=end
