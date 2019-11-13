/*
 * @lc app=leetcode id=287 lang=javascript
 *
 * [287] Find the Duplicate Number
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function (nums) {

  for (let num of nums) {
    if (nums[Math.abs(num) - 1] < 0) {
      return Math.abs(num);
    }
    nums[Math.abs(num) - 1] *= -1
  }
};

