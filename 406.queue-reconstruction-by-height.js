/*
 * @lc app=leetcode id=406 lang=javascript
 *
 * [406] Queue Reconstruction by Height
 */

// @lc code=start
/**
 * @param {number[][]} people
 * @return {number[][]}
 */

// Approach 1: Greedy
var reconstructQueue = function (people) {
  people.sort((a, b) => {
    return a[0] === b[0] ? a[1] - b[1] : b[0] - a[0];
  });

  let output = [];
  for (let p of people) {
    output.splice(p[1], 0, p);
  }
  return output;
};

// reconstructQueue([
//   [7, 0],
//   [4, 4],
//   [7, 1],
//   [5, 0],
//   [6, 1],
//   [5, 2],
// ]);
// @lc code=end
