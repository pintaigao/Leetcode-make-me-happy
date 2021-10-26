/*
 * @lc app=leetcode id=616 lang=javascript
 *
 * [616] Add Bold Tag in String
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string[]} dict
 * @return {string}
 */

// Use a boolean array to mark if character at each position is bold or not. After that, things will become simple.

// 不用end这东西我觉得 O(N) O(N)
var addBoldTag = function (s, dict) {
  let bold = [];
  for (let i = 0, end = 0; i < s.length; i++) {
    for (let word of dict) {
      if (s.startsWith(word, i)) {
        end = Math.max(end, i + word.length);
      }
    }
    bold[i] = end > i;
  }

  let result = "";
  for (let i = 0; i < s.length; i++) {
    if (!bold[i]) {
      result += s[i];
      continue;
    }
    let j = i;
    while (j < s.length && bold[j]) j++;
    result += "<b>" + s.substring(i, j) + "</b>";
    i = j - 1;
  }

  return result;
};
// @lc code=end
