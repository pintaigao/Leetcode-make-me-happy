/*
 * @lc app=leetcode id=416 lang=javascript
 *
 * [416] Partition Equal Subset Sum
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */

/* 基本的回溯 */
var canPartition = function (nums) {
  if (nums == null || nums.length == 0) return false;
  let sum = nums.reduce((a, b) => a + b);

  // 特判：如果是奇数，就不符合要求
  if (sum % 2 !== 0) return false;
  let target = sum / 2, flag = false; //目标和,等价于在数组中搜索是否有其中的数等于target
  isTrue(0, 0);

  function isTrue(index, sum) {
    if (sum > target || index >= nums.length) {
      return;
    }
    if (sum == target) {
      flag = true;
    }
    //不要用 for loop 来遍历数组，因为是连续的元素，不能跳过元素
    //选择当前元素
    isTrue(index + 1, sum + nums[index]);
    //不选择当前元素
    isTrue(index + 1, sum);
  }

  return flag;
};

/* 动态规划一：出处:https://leetcode.cn/problems/partition-equal-subset-sum/solution/0-1-bei-bao-wen-ti-xiang-jie-zhen-dui-ben-ti-de-yo/*/
var canPartition10 = function (nums) {
  let sum = nums.reduce((a, b) => a + b), n = nums.length;

  // 和为奇数时，不可能划分成两个和相等的集合
  if (sum % 2 != 0) {
    return false;
  } else {
    sum = sum / 2;
  }
  // 初始化 dp 数组，dp[i][j] 表示前 i 个nums 能否凑出和为 j
  let dp = Array.from({ length: nums.length + 1 }, () => Array(sum + 1).fill(false));
  // base case,背包没有容量的话，任何物品都可以不放（恰好可以将背包装满0容量），所以 dp[i][0] = true
  for (let i = 0; i <= n; i++) dp[i][0] = true;

  // i 表示前 i 个物品，j 表示背包容量 （i 表示 nums 里面的数，j 表示目标和）
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= sum; j++) {
      if (j - nums[i - 1] < 0) {
        // 背包容量不足，不能装入第 i 个物品
        dp[i][j] = dp[i - 1][j];
      } else {
        // 如果不把 nums[i] 算入子集，或者说你不把这第 i 个物品装入背包，那么是否能够恰好装满背包，取决于上一个状态 dp[i-1][j]，继承之前的结果。
        // 如果把 nums[i] 算入子集，或者说你把这第 i 个物品装入了背包，那么是否能够恰好装满背包，取决于状态 dp[i - 1][j - nums[i - 1]]。
        // 不装入 或 装入背包 （选择 true 的那个）
        dp[i][j] = dp[i - 1][j] || dp[i - 1][j - nums[i - 1]];
      }
    }
  }
  return dp[n][sum];
};

// 用一维数组优化空间复杂度
var canPartition = function (nums) {
  let sum = nums.reduce((a, b) => a + b, 0);
  // 和为奇数时，不可能划分成两个和相等的集合
  if (sum % 2 !== 0) return false;

  let n = nums.length;
  sum = sum / 2;
  let dp = new Array(sum + 1).fill(false);

  // base case
  dp[0] = true;

  for (let i = 0; i < n; i++) {
    for (let j = sum; j >= 0; j--) {
      if (j - nums[i] >= 0) {
        dp[j] = dp[j] || dp[j - nums[i]];
      }
    }
  }
  return dp[sum];
};