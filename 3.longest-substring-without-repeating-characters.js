/*
 * @lc app=leetcode id=3 lang=javascript
 *
 * [3] Longest Substring Without Repeating Characters
 */
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let map = {};
  let result = 0;
  let leftStart = 0;
  for (let i = 0; i < s.length; i++) {
    let char = s[i];
    if (map[char] !== undefined) {
      leftStart = map[char] + 1 > leftStart ? map[char] + 1: leftStart;
    }
    result = Math.max(i - leftStart + 1,result);
    map[char] = i;
  }

  return result;
};

