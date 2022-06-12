/*
 * @lc app=leetcode id=260 lang=javascript
 *
 * [260] Single Number III
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumber = function (nums) {
  let hashmap = {};
  for (let n of nums) {
    hashmap[n] = hashmap[n] ? hashmap[n] + 1 : 1;
  }

  let output = [];
  for (let item in hashmap) {
    if (hashmap[item] == 1) {
      output.push(item);
    }
  }

  return output;
};
// @lc code=end
