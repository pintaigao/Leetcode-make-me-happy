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
  if (nums == null || nums.length == 0) {
    return false;
  }
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
    //选择当前元素
    isTrue(index + 1, sum + nums[index]);
    //不选择当前元素
    isTrue(index + 1, sum);
  }
  return flag;
};

/* 基本的回溯 + 剪枝*/
var canPartition = function (nums) {
  if (nums == null || nums.length == 0) {
    return false;
  }
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
    //选择当前元素
    isTrue(index + 1, sum + nums[index]);
    //不选择当前元素
    isTrue(index + 1, sum);
  }
  return flag;
};

/* 动态规划一：出处:https://leetcode.cn/problems/partition-equal-subset-sum/solution/0-1-bei-bao-wen-ti-xiang-jie-zhen-dui-ben-ti-de-yo/*/
var canPartition = function (nums) {
  let len = nums.length;
  // 题目已经说非空数组，可以不做非空判断
  let sum = nums.reduce((a, b) => a + b);

  // 特判：如果是奇数，就不符合要求
  if (sum % 2 !== 0) return false;

  let target = sum / 2;
  // 创建二维状态数组，行：物品索引，列：容量（包括 0）
  let dp = new Array(le).fill(0).map(() => new Array(target + 1).fill(false));

  // 先填表格第 0 行，第 1 个数只能让容积为它自己的背包恰好装满
  if (nums[0] <= target) {
    dp[0][nums[0]] = true;
  }
  // 再填表格后面几行
  for (let i = 1; i < len; i++) {
    for (let j = 0; j <= target; j++) {
      // 直接从上一行先把结果抄下来，然后再修正
      dp[i][j] = dp[i - 1][j];

      if (nums[i] == j) {
        dp[i][j] = true;
        continue;
      }
      if (nums[i] < j) {
        dp[i][j] = dp[i - 1][j] || dp[i - 1][j - nums[i]];
      }
    }
  }
  return dp[len - 1][target];
};
// @lc code=end
