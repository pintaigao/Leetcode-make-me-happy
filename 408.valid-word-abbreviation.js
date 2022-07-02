/*
 * @lc app=leetcode id=408 lang=javascript
 *
 * [408] Valid Word Abbreviation
 */

// @lc code=start
/**
 * @param {string} word
 * @param {string} abbr
 * @return {boolean}
 */
var validWordAbbreviation = function (word, abbr) {
  var [wordLen, abbrLen, num, flag] = [word.length, 0, 0, true];
  [...abbr].forEach((value) => {
    // 如果这个位置是字母
    if (value >= "a" && value <= "z") {
      abbrLen += num + 1;
      num = 0;
      // 如果现在计算出来的长度大于word原本的长度，或者这个value和word不在一个位置上（word & 3e）
      if (abbrLen > wordLen || value != word[abbrLen - 1]) {
        flag = 0;
      }
    } else {
      // 如果一开始就是0，
      if (num == 0 && value == "0") {
        flag = 0;
      }
      num = num * 10 + (value - "0");
    }
  });
  return flag && abbrLen + num == wordLen;
};
// @lc code=end
