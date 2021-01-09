/*
 * @lc app=leetcode id=387 lang=javascript
 *
 * [387] First Unique Character in a String
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function (s) {
  let count = new Map();
  let n = s.length;
  // build hash map : character and how often it appears
  for (let i = 0; i < n; i++) {
    if (count.has(s[i])) {
      count.set(s[i], count.get(s[i]) + 1);
    } else {
      count.set(s[i], 1);
    }
  }

  console.log(count);

  // find the index
  for (let i = 0; i < n; i++) {
    if (count.get(s[i]) == 1) return i;
  }
  return -1;
};

firstUniqChar("leetcode");
// @lc code=end
