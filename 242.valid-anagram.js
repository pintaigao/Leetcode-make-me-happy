/*
 * @lc app=leetcode id=242 lang=javascript
 *
 * [242] Valid Anagram
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  if (s.length != t.length) {
    return false;
  }
  let table = new Array(26).fill(0);
  for (let i = 0; i < s.length; i++) {
    table[s.charCodeAt(i) - "a".charCodeAt(0)] += 1;
  }
  console.log(table);

  for (let i = 0; i < t.length; i++) {
    table[t.charCodeAt(i) - "a".charCodeAt(0)] -= 1;
    console.log(table);
    if (table[t.charCodeAt(i) - "a".charCodeAt(0)] < 0) {
      return false;
    }
  }
  return true;
};

isAnagram("a", "b");
// @lc code=end
