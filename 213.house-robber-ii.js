/*
 * @lc app=leetcode id=213 lang=javascript
 *
 * [213] House Robber II
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  if (nums.length === 1) return nums[0]
  // non-circle 
  // MAX(pre2 + current, pre1)
  return Math.max(_rob(nums.slice(1)), _rob(nums.slice(0, nums.length - 1)))
};

function _rob(arr) {
  let pre1 = 0
  let pre2 = 0
  for (let i = 0; i < arr.length; i++) {
    let max = Math.max(arr[i] + pre2, pre1)
    pre2 = pre1
    pre1 = max
  }
  return pre1
}

