/*
 * @lc app=leetcode id=266 lang=javascript
 *
 * [266] Palindrome Permutation
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
// 1. HashMap
var canPermutePalindrome = function (s) {
  let map = {};
  for (let i = 0; i < s.length; i++) {
    if (map[s[i]] == undefined) {
      map[s[i]] = 1;
    } else {
      map[s[i]] += 1;
    }
  }
  console.log(map);

  let count = 0;
  for (let key in map) {
    count += map[key] % 2;
  }
  return count <= 1;
};

canPermutePalindrome("carerac");
// @lc code=end
