/*
 * @lc app=leetcode id=14 lang=javascript
 *
 * [14] Longest Common Prefix
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  if (strs.length == 0) return "";
  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++)
    while (strs[i].indexOf(prefix) != 0) {
      // flower从后往前一个一个的减，慢慢跟flow去匹配，直到indexOf = 0
      prefix = prefix.substring(0, prefix.length - 1);
      if (prefix.length == 0) return "";
    }
  return prefix;
};
// @lc code=end
