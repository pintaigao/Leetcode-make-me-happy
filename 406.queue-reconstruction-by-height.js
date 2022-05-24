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

/* Solution 1: Greedy */
var reconstructQueue = function (people) {
  // 两个array比较，先按高度降序排序，如果高度[0]相同，人少[1]的放前面
  // [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]] ==> [[7,0], [7,1], [6,1],[5,0],[5,2],[4,4]]
  people.sort((a, b) => {
    return a[0] === b[0] ? a[1] - b[1] : b[0] - a[0];
  });

  let output = [];
  for (let p of people) {
    // 在p[1]的位置插入p
    output.splice(p[1], 0, p);
  }
  return output;
};
// @lc code=end
