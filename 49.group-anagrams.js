/*
 * @lc app=leetcode id=49 lang=javascript
 *
 * [49] Group Anagrams
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  if (strs.length === 0) return [];
  let ans = {};
  for (let s of strs) {
    let count = new Array(26).fill(0);
    for (let i = 0; i < s.length; i++) {
      count[s.charCodeAt(i) - "a".charCodeAt(0)] += 1;
    }
    let key = count.join("#");
    ans[key] ? ans[key].push(s) : (ans[key] = [s]);
  }

  return Object.values(ans);
};
// @lc code=end
