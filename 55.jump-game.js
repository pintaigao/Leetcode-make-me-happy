/*
 * @lc app=leetcode id=55 lang=javascript
 *
 * [55] Jump Game
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
  let maxReach = 0; // 定义变量maxReach表示当前能够到达的最远位置，初始值为0
  for (let i = 0; i < nums.length; i++) { // 遍历数组，对于每个位置i
    if (i <= maxReach) { // 如果当前位置i小于等于maxReach，说明可以从前面某个位置通过跳跃到达当前位置i
      maxReach = Math.max(maxReach, i + nums[i]); // 更新maxReach为max(maxReach, i + nums[i])
    }
    if (maxReach >= nums.length - 1) { // 如果maxReach大于等于数组的最后一个位置，说明可以到达最后一个位置
      return true; // 返回true
    }
  }
  return false; // 如果无法到达最后一个位置，返回false
};
// @lc code=end

