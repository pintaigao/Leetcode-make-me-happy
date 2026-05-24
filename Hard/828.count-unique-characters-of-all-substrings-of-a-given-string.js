/*
 * @lc app=leetcode id=828 lang=javascript
 *
 * [828] Count Unique Characters of All Substrings of a Given String
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
/** DP
 * https://leetcode.com/problems/count-unique-characters-of-all-substrings-of-a-given-string/discuss/129021/O(N)-Java-Solution-DP-Clear-and-easy-to-Understand
 * */
var uniqueLetterString = function (S) {
  let res = 0;
  if (S == null || S.length == 0) return res;
  let showLastPosition = new Array(128).fill(0);
  let contribution = new Array(128).fill(0);
  let cur = 0;
  for (let i = 0; i < S.length; i++) {
    let x = S[i];
    cur -= contribution[x];
    contribution[x] = i - (showLastPosition[x] - 1);
    cur += contribution[x];
    showLastPosition[x] = i + 1;
    res += cur;
  }
  return res;
};
// @lc code=end
