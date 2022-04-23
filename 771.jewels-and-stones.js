/*
 * @lc app=leetcode id=771 lang=javascript
 *
 * [771] Jewels and Stones
 */

// @lc code=start
/**
 * @param {string} jewels
 * @param {string} stones
 * @return {number}
 */
/* 26*2 个字母Array的做法 */
var numJewelsInStones = function (jewels, stones) {
  let type = new Array(256).fill(0);
  for (let i = 0; i < jewels.length; i++) {
    type[jewels.charCodeAt(i)] = 1;
  }
  let ans = 0;
  for (let i = 0; i < stones.length; i++) {
    ans += type[stones.charCodeAt(i)];
  }
  return ans;
};

// Brute Force
var numJewelsInStones = function (jewels, stones) {
  let ans = 0;
  for (let s of stones.split("")) // For each stone...
    for (let j of jewels.split("")) // For each jewel...
      if (j == s) {
        // If the stone is a jewel...
        ans += 1;
        break; // Stop searching whether this stone 's' is a jewel
      }
  return ans;
};
// @lc code=end

// HashSet
let numJewelsInStones2 = function (jewels, stones) {
  let Jset = new Set();
  for (let j of jewels.split("")) Jset.add(j);

  let ans = 0;
  for (let s of stones.split("")) if (Jset.has(s)) ans += 1;
  return ans;
};
// @lc code=end
