/*
 * @lc app=leetcode id=17 lang=javascript
 *
 * [17] Letter Combinations of a Phone Number
 */

// @lc code=start
/**
 * @param {string} digits
 * @return {string[]}
 */

var letterCombinations = function (digits) {
  // 数字到号码的映射
  let map = ["abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"];
  let result = [];
  let path = "";
  if (digits == null || digits.length == 0) return result;

  let backtrack = function (index) {
    if (path.length == digits.length) {
      result.push(path.slice());
      return;
    }
    let val = map[digits[index] - "2"];

    for (let char of val.split("")) {
      path += char;
      backtrack(index + 1);
      path = path.substring(0, path.length - 1);
    }
  };

  // 0 代表的是从digits的index=0开始
  backtrack(0);
  return res;
};
// @lc code=end
