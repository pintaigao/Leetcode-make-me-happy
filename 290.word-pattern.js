/*
 * @lc app=leetcode id=290 lang=javascript
 *
 * [290] Word Pattern
 */

// @lc code=start
/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
/* Solution 1: Two Hash Map */
var wordPattern = function (pattern, str) {
  var pArr = pattern.split("");
  var sArr = str.split(" ");
  if (pArr.length !== sArr.length) return false;
  var mapP2S = {};
  var mapS2P = {};
  for (var i = 0; i < pArr.length; ++i) {
    if (mapP2S[pArr[i]]) {
      if (sArr[i] !== mapP2S[pArr[i]]) return false;
    } else {
      mapP2S[pArr[i]] = sArr[i];
    }
    if (mapS2P[sArr[i]]) {
      if (pArr[i] !== mapS2P[sArr[i]]) return false;
    } else {
      mapS2P[sArr[i]] = pArr[i];
    }
  }
  return true;
};
// @lc code=end
