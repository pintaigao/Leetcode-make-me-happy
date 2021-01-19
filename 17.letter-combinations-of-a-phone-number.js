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
  let ans = [];
  if (digits == null || digits.length == 0) return ans;
  let map = new Array(8).fill([]);
  console.log(map);
  map[0] = "abc".split("");
  map[1] = "def".split("");
  map[2] = "ghi".split("");
  map[3] = "jkl".split("");
  map[4] = "mno".split("");
  map[5] = "pqrs".split("");
  map[6] = "tuv".split("");
  map[7] = "wxyz".split("");

  let input = digits.split("");
  console.log(map);
  ans.push("");
  for (let c of input) {
    ans = expand(ans, map[c - "2"]);
  }

  console.log("The answer is: " + ans);
  return ans;
};

let expand = function (l, arr) {
  let next = [];
  for (let s of l) {
    for (let c of arr) {
      next.push(s + c);
    }
  }
  return next;
};
// @lc code=end

letterCombinations("23");
