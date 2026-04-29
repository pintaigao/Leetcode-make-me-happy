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
  let target = sum / 2; //目标和,等价于在数组中搜索是否有其中的数等于target
  let flag = false;
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

  let dp = Array.from({ length: nums.length + 1 }, () => Array(sum + 1).fill(false));
  // base case
  for (let i = 0; i <= n; i++) dp[i][0] = true;

  // i 表示前 i 个物品，j 表示背包容量 （i 表示 nums 里面的数，j 表示目标和）
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= sum; j++) {
      if (j - nums[i - 1] < 0) {
        // 背包容量不足，不能装入第 i 个物品
        dp[i][j] = dp[i - 1][j];
      } else {
        // 装入或不装入背包
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