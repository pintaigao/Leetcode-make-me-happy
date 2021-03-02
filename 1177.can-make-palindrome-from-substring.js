/*
 * @lc app=leetcode id=1177 lang=javascript
 *
 * [1177] Can Make Palindrome from Substring
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number[][]} queries
 * @return {boolean[]}
 */

// Approach 1: prefix sum - count each char
var canMakePaliQueries = function (s, queries) {
  let ans = [];
  let cnt = new Array(s.length + 1).fill(null).map((pos) => {
    return new Array(26).fill(0);
  });

  for (let i = 0; i < s.length; ++i) {
    cnt[i + 1] = cnt[i].slice(); // copy previous sum.
    cnt[i + 1][s.charCodeAt(i) - "a".charCodeAt(0)] += 1;
  }

  console.log(cnt);
  for (let q of queries) {
    let sum = 0;
    for (let i = 0; i < 26; ++i) {
      sum += (cnt[q[1] + 1][i] - cnt[q[0]][i]) % 2;
    }
    ans.push(parseInt(sum / 2) <= q[2]);
  }
  return ans;
};
canMakePaliQueries("abcda", [
  [3, 3, 0],
  [1, 2, 0],
  [0, 3, 1],
  [0, 3, 2],
  [0, 4, 1],
]);

// @lc code=end
