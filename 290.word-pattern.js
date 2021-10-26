/*
 * @lc app=leetcode id=290 lang=javascript
 *
 * [290] Word Pattern
 */

// @lc code=start
/**
 * @param {string} pattern
 * @param {string} str
 * @return {boolean}
 */
// Approach 1: Two Hash Maps O(N) O(N)
var wordPattern = function (pattern, str) {
  var pArr = pattern.split("");
  var sArr = str.split(" ");
  if (pArr.length !== sArr.length) return false;
  var mapP2S = {};
  var mapS2P = {};
  for (var i = 0; i < pArr.length; ++i) {
    if (pArr[i] in mapP2S) {
      if (sArr[i] !== mapP2S[pArr[i]]) return false;
    } else {
      mapP2S[pArr[i]] = sArr[i];
    }
    if (sArr[i] in mapS2P) {
      if (pArr[i] !== mapS2P[sArr[i]]) return false;
    } else {
      mapS2P[sArr[i]] = pArr[i];
    }
  }
  return true;
};

// wordPattern("abba", "dog cat cat dog");
// @lc code=end
