/*
 * @lc app=leetcode id=1047 lang=javascript
 *
 * [1047] Remove All Adjacent Duplicates In String
 */

// @lc code=start
/**
 * @param {string} S
 * @return {string}
 */
var removeDuplicates = function (S) {
  let length = S.length;
  let string = [S[0]];
  let index = 0;
  for (let i = 1; i < length; i++) {
    let letter = S[i];
    if (string[index] === S[i]) {
      string.pop();
      index -= 1;
      continue;
    }
    string.push(letter);
    index += 1;
  }
  return string.join("");
};
// @lc code=end
