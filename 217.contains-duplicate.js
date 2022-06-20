/*
 * @lc app=leetcode id=217 lang=javascript
 *
 * [217] Contains Duplicate
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function (nums) {
  let set = new Set();
  for (let x of nums) {
    if (set.has(x)) return true;
    set.add(x);
  }
  return false;
};
// @lc code=end
