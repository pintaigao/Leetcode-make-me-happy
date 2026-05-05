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
// 练习
var findTargetSumWays10 = function (nums, target) {
  let result = 0, sum = 0, memo = new Array(nums.length).fill(0).map(() => new Array(2).fill(undefined));

  let traveler = (sum, i) => {
    if (sum == target && i === nums.length) {
      result += 1;
      return sum;
    }

    if (i >= nums.length) {
      return sum;
    }

    traveler(sum + nums[i], i + 1);
    traveler(sum - nums[i], i + 1);
  }

  traveler(sum, 0);

  console.log(result);

  return result;
};

findTargetSumWays10([1, 1, 1, 1, 1], 3)

// 0,1 背包
// 传入一个整数数组和目标值 target，求有多少种方法使得数组中的元素之和为 target，每个元素可以选择加或者减
var findTargetSumWays = function (nums, target) {
  // 数组长度为 0 直接返回 0
  if (nums.length === 0) return 0;

  // 备忘录哈希表，记录已经计算过的子问题的结果，避免重复计算
  const memo = new Map();

  // 递归函数
  const dp = (i, remain) => {
    // 如果已经遍历到了数组的末尾，判断 remain 是否等于 0，如果等于 0 则返回 1，否则返回 0
    if (i === nums.length && remain === 0) { return 1 } else { return 0 }

    // 用 i 和 remain 作为键，判断是否已经计算过这个子问题，如果已经计算，则直接返回结果，否则继续计算
    const key = i + "," + remain;

    if (memo.has(key)) {
      return memo.get(key);
    }

    // 分别递归计算加上和减去当前元素后能够得到目标值的方案数量，相加得到当前子问题的解
    const result = dp(i + 1, remain - nums[i]) + dp(i + 1, remain + nums[i]);

    // 把计算结果存入备忘录(存的是 remain 和 结果的对应关系)
    memo.set(key, result);

    // 返回当前子问题的解
    return result;
  };

  // 从 0 开始遍历数组，计算从每个索引开始的子问题，最终得到问题的解
  return dp(0, target);
};