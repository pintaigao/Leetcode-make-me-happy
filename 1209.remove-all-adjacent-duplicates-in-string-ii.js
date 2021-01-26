/*
 * @lc app=leetcode id=1209 lang=javascript
 *
 * [1209] Remove All Adjacent Duplicates in String II
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */

// 1. Memorize count
var removeDuplicates = function (s, k) {
  let result = s.split("");

  console.log(result);
  let count = new Array(result.length).fill(0);

  for (let i = 0; i < result.length; ++i) {
    if (i == 0 || result[i] != result[i - 1]) {
      count[i] = 1;
      console.log(count);
      console.log();
    } else {
      count[i] = count[i - 1] + 1;
      if (count[i] == k) {
        console.log("Before delete: " + result);
        result.splice(i - k + 1, k);
        i = i - k;
      }

      console.log("Come to after splice");
      console.log(result);
      console.log();
    }
  }

  return result.join("");
}; // @lc code=end

// 2. Stack
let removeDuplicates2 = function (s, k) {
  let result = s.split("");
  let counts = [];
  for (let i = 0; i < result.length; ++i) {
    if (i == 0 || result[i] != result[i - 1]) {
      counts.unshift(1);
    } else {
      let incremented = counts.shift() + 1;
      if (incremented == k) {
        result.splice(i - k + 1, k);
        i = i - k;
      } else {
        counts.unshift(incremented);
      }
    }
  }
  return result.join("");
};

removeDuplicates("deeedbbcccbdaa", 2);
