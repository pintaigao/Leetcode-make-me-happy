/*
 * @lc app=leetcode id=169 lang=javascript
 *
 * [169] Majority Element
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  const hash = {};
  let max = 0,
    val;

  for (let i = 0; i < nums.length; i++) {
    hash[nums[i]] ? hash[nums[i]]++ : (hash[nums[i]] = 1);
    if (hash[nums[i]] > max) {
      max = hash[nums[i]];
      val = nums[i];
    }
  }

  return val;
};
// @lc code=end
