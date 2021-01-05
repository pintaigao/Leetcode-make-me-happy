/*
 * @lc app=leetcode id=953 lang=javascript
 *
 * [953] Verifying an Alien Dictionary
 */

// @lc code=start
/**
 * @param {string[]} words
 * @param {string} order
 * @return {boolean}
 */
var isAlienSorted = function (words, order) {
  let index = [];

  for (let i = 0; i < order.length; i++) {
    index[order.charCodeAt(i) - "a".charCodeAt(0)] = i;
  }

  for (let i = 0; i < words.length - 1; ++i) {
    let word1 = words[i];
    let word2 = words[i + 1];
    let compareWords = true;

    for (
      let length = 0;
      length < Math.min(word1.length, word2.length);
      length++
    ) {
      if (word1[length] != word2[length]) {
        let ch1 = word1.charCodeAt(length) - "a".charCodeAt(0);
        let ch2 = word2.charCodeAt(length) - "a".charCodeAt(0);
        if (index[ch1] > index[ch2]) {
          return false;
        }
        compareWords = false;
        break;
      }
    }

    if (word1.length > word2.length && compareWords) {
      return false;
    }
  }

  return true;
};
// @lc code=end
