/*
 * @lc app=leetcode id=128 lang=javascript
 *
 * [128] Longest Consecutive Sequence
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
  let num_set = new Set(nums);

  let result = 0;

  for (const num of num_set) {
    // 如果当前的数，没有比它小一个的，就看有没有以他为第一个的连续的
    if (!num_set.has(num - 1)) {
      let currentNum = num;
      let currentStreak = 1;

      while (num_set.has(currentNum + 1)) {
        currentNum += 1;
        currentStreak += 1;
      }

      result = Math.max(result, currentStreak);
    }
  }

  return result;
};
// @lc code=end
