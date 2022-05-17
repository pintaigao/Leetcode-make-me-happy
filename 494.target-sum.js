/*
 * @lc app=leetcode id=494 lang=javascript
 *
 * [494] Target Sum
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function (nums, target) {
  let dp = function (index, curr_sum) {
    // Base Cases
    if (index < 0 && curr_sum == target) return 1;
    if (index < 0) return 0;

    // Decisions
    let positive = dp(index - 1, curr_sum + nums[index]);
    let negative = dp(index - 1, curr_sum - nums[index]);

    return positive + negative;
  };

  let index = nums.length - 1;
  let curr_sum = 0;
  return dp(index, curr_sum);
};

/* DFS */
var findTargetSumWays = function (nums, target) {
  let dfs = function (index, curr_sum) {
    if (index == nums.length) {
      return curr_sum == target ? 1 : 0;
    }

    let positive = dfs(index + 1, curr_sum + nums[index]);
    let negative = dfs(index + 1, curr_sum - nums[index]);

    return positive + negative;
  };

  return dfs(0, 0);
};

/* 记忆化的DFS */
var findTargetSumWays = function (nums, target) {
  let map = {};
  let dfs = function (index, curr_sum) {
    let key = index + "-" + curr_sum;
    if (map.hasOwnProperty(key)) return map[key];
    if (index == nums.length) {
      map[key] = curr_sum == target ? 1 : 0;
      return map[key];
    }

    let positive = dfs(index + 1, curr_sum + nums[index]);
    let negative = dfs(index + 1, curr_sum - nums[index]);

    map[key] = positive + negative;

    return map[key];
  };

  return dfs(0, 0);
};

/* 动态规划 */

// @lc code=end
