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

// 1. HashMap
var singleNumber = function (nums) {
  let hashmap = {};
  for (let n of nums) {
    if (hashmap[n] === undefined) {
      hashmap[n] = 0;
    } else {
      hashmap[n] += 1;
    }
  }

  console.log(hashmap);

  let output = new Array(2);
  let idx = 0;
  for (let item in hashmap) {
    if (hashmap[item] == 0) {
      output[idx] = item;
      idx += 1;
    }
  }

  return output;
};

// @lc code=end
