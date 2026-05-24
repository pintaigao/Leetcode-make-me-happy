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
  var pArr = pattern.split(""), sArr = str.split(" ");
  if (pArr.length !== sArr.length) return false;
  var mapP2S = {}, mapS2P = {};
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


// Map and Set
var wordPattern = function (pattern, s) {
  // 记录 pattern 字符到单词的映射, 记录那些已经有 pattern 对应的单词
  const words = s.split(" "), patternToWord = {}, wordSet = new Set();
  if (pattern.length !== words.length) {
    return false;
  }

  for (let i = 0; i < pattern.length; i++) {
    const c = pattern[i], word = words[i];
    if (!patternToWord[c]) {
      if (wordSet.has(word)) {
        // 这个单词以前已经有其他模式字符对应了
        return false;
      }
      // 添加 c -> word 的映射
      patternToWord[c] = word;
    } else {
      // 这个 pattern 字符已经出现过，确保和之前对应的单词相同
      if (patternToWord[c] !== word) {
        return false;
      }
    }
    // 这个单词已经有模式字符对应
    wordSet.add(word);
  }

  return true;
};

var wordPattern2 = function (pattern, s) {
  const words = s.split(" ");
  if (pattern.length !== words.length) {
    return false;
  }
  // 记录 pattern 字符到单词的映射
  const wordToPattern = new Map();
  // 记录那些已经有模式字符对应的单词
  const patternCharSet = new Set();

  for (let i = 0; i < pattern.length; i++) {
    const c = pattern[i];
    const word = words[i];
    if (!wordToPattern.has(word)) {
      // 当前这个单词还没有对应的模式字符
      if (patternCharSet.has(c)) {
        // 对应的模式字符之前已经对应了其他单词
        return false;
      }
      // 添加 word -> c 的映射
      wordToPattern.set(word, c);
    } else {
      // 这个单词之前已经出现过，确保当前单词和之前对应的模式字符相同
      if (wordToPattern.get(word) !== c) {
        return false;
      }
    }
    patternCharSet.add(c);
  }
  return true;
};
// @lc code=end
