/*
 * @lc app=leetcode id=395 lang=javascript
 *
 * [395] Longest Substring with At Least K Repeating Characters
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */

/* 双指针 */
var longestSubstring = function (s, k) {
  if (s == null || s.length == 0) return 0;
  let chars = new Array(26).fill(0);
  // 记录每个字符出现的次数
  for (let i = 0; i < s.length; i += 1) {
    chars[s.charCodeAt(i) - "a".charCodeAt(0)] += 1;
  }

  console.log(chars);
  let flag = true;

  // 如果每个字符的数量都大于等于k，则返回s的长度
  for (let num of chars) {
    // 只要有一个字符的数量小于k，就不满足，就要接着走下面的方程
    if (num < k && num > 0) flag = false;
  }
  // return the length of string if this string is a valid string
  if (flag) return s.length;

  let result = 0;
  let start = 0;
  let cur = 0;
  // otherwise we use all the infrequent elements as splits
  while (cur < s.length) {
    if (chars[s.charCodeAt(cur) - "a".charCodeAt(0)] < k) {
      result = Math.max(result, longestSubstring2(s.substring(start, cur), k));
      start = cur + 1;
    }
    cur += 1;
  }
  result = Math.max(result, longestSubstring2(s.substring(start), k));
  return result;
};
// @lc code=end
