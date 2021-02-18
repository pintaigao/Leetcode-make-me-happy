/*
 * @lc app=leetcode id=245 lang=javascript
 *
 * [245] Shortest Word Distance III
 */

// @lc code=start
/**
 * @param {string[]} words
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var shortestWordDistance = function (words, word1, word2) {
  var i1,
    i2,
    ans = 99999;
  var same = word1 == word2;
  for (var i = 0; i < words.length; i++) {
    if (same) {
      if (words[i] != word1) continue;
      if (i1 != undefined) {
        ans = Math.min(ans, Math.abs(i - i1));
      }
      i1 = i;
    } else {
      if (words[i] == word1) i1 = i;
      if (words[i] == word2) i2 = i;
      if (i1 != undefined && i2 != undefined)
        ans = Math.min(ans, Math.abs(i1 - i2));
    }
  }
  return ans;
};
// @lc code=end
