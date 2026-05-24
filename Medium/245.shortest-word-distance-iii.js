/*
 * @lc app=leetcode id=245 lang=javascript
 *
 * [245] Shortest Word Distance III
 */

// @lc code=start
/**
 * @param {string[]} wordsDict
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var shortestWordDistance = function (wordsDict, word1, word2) {
  let index1, index2, ans = Number.MAX_VALUE, same = word1 == word2;
  for (var i = 0; i < wordsDict.length; i++) {
    // 如果两个单词相同，记录前一个单词的位置
    if (same && wordsDict[i] == word1) {
      if (i1 != undefined) {
        ans = Math.min(ans, Math.abs(i - i1));
      }
      i1 = i;
    } else {
      // 如果两个单词不相同，则只需要比较两个单词的位置即可
      if (wordsDict[i] == word1) i1 = i;
      if (wordsDict[i] == word2) i2 = i;
      if (i1 >= 0 && i2 >= 0) ans = Math.min(ans, Math.abs(i1 - i2));
    }
  }
  return ans;
};
// @lc code=end
