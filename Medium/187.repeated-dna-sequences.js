/*
 * @lc app=leetcode id=187 lang=javascript
 *
 * [187] Repeated DNA Sequences
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string[]}
 */
var findRepeatedDnaSequences = function (s) {
  let [store, result] = [new Set(), new Set()];
  for (let i = 0; i < s.length - 9; i++) {
    const str = s.substring(i, i + 10);
    if (store.has(str)) {
      result.add(str);
    } else {
      store.add(str);
    }
  }
  return [...result];
};
// @lc code=end
