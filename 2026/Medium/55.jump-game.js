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

// 1. 动态规划,暴力点的解法
var canJump = function (nums) {
  const n = nums.length, dp = new Array(n).fill(false); // 创建一个长度为n的数组dp，初始值为false
  dp[0] = true; // 起点位置可以到达
  for (let i = 1; i < n; i++) { // 遍历数组，从位置1开始
    for (let j = 0; j < i; j++) { // 对于每个位置i，检查之前的位置j
      if (dp[j] && j + nums[j] >= i) { // 如果位置j可以到达且从j跳跃可以到达i
        dp[i] = true; // 标记位置i为可达
        break; // 跳出内层循环
      }
    }
  }
  return dp[n - 1]; // 返回最后一个位置是否可达
};



// 2.贪心算法
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

// 3. 贪心算法
var canJump = function (nums) {
  let n = nums.length, farthest = 0;
  for (let i = 0; i < n - 1; i++) {
    // 不断计算能跳到的最远距离
    farthest = Math.max(farthest, i + nums[i]);
    // 可能碰到了 0，卡住跳不动了
    if (farthest <= i) {
      return false;
    }
  }
  return farthest >= n - 1;
}


// 4. 贪心算法
var canJump = function (nums) {
  let max = 0;

  for (let i = 0; i < nums.length; i++) {
    if (i > max) {
      return false;
    }
    max = Math.max(max, i + nums[i]);
  }
  return true;
};
// @lc code=end

