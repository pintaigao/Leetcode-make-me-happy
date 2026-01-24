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
  let hash = {}, max = 0, val = nums[0];

  for (let [num, i] of nums) {
    hash[num] ? hash[num] += 1 : hash[num] = 1;

    if (hash[num] > max) {
      max = hash[num];
      val = num;
    }
  }

  return val;
};

// O(1) space solution: 摩尔投票算法：核心理念为 票数正负抵消
var majorityElement = function (nums) {
  let count = 0, candidate = null;

  for (let num of nums) {
    if (count === 0) {
      candidate = num;
    }
    count += (num === candidate) ? 1 : -1;
  }

  return candidate;
}


// @lc code=end
