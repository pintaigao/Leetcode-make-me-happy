/**
 * @param {number[]} nums
 * @return {number}
 */
function maxSubArray1(nums) {
  // 初始化当前子数组和为数组第一个元素
  let currentSum = nums[0]; // 当前以某位置结尾的最大子数组和
  // 初始化全局最大子数组和为数组第一个元素
  let maxSum = nums[0]; // 当前找到的全局最大子数组和

  // 遍历数组从第二个元素开始
  for (let i = 1; i < nums.length; i++) {
    // 更新当前子数组和：
    // 如果前面的和是负数，直接舍弃，从当前元素重新开始
    currentSum = Math.max(nums[i], currentSum + nums[i]);

    // 更新全局最大子数组和
    maxSum = Math.max(maxSum, currentSum);
  }

  // 返回全局最大子数组和
  return maxSum;
}

// 练习 暴力解法
function maxSubArray2(nums) {
  let result = -Number.MAX_VALUE;

  for (let i = 0; i < nums.length; i++) {
    let sum = 0;

    for (let j = i; j < nums.length; j++) {
      sum += nums[j];

      result = Math.max(result, sum);
    }
  }

  return result;
}

// DP解法
function maxSubArray(nums) {
  const dp = new Array(nums.length).fill(0);
  dp[0] = nums[0];

  for (let i = 1; i < nums.length; i++) {
    // dp[i]的值，要么是前一个子数组和加上当前元素，要么是当前元素本身（如果前一个子数组和为负数）
    dp[i] = Math.max(dp[i - 1] + nums[i], nums[i]);
  }

  console.log(dp);

  return Math.max(...dp);
}

maxSubArray([-2, 1, -3]);

// 滑动窗口的解法
var maxSubArray3 = function (nums) {
  let left = 0, right = 0, windowSum = 0, maxSum = Number.MIN_SAFE_INTEGER;
  while (right < nums.length) {
    // 扩大窗口并更新窗口内的元素和
    windowSum += nums[right];
    right++;

    // 更新答案
    maxSum = windowSum > maxSum ? windowSum : maxSum;

    // 判断窗口是否要收缩
    while (windowSum < 0) {
      // 缩小窗口并更新窗口内的元素和
      windowSum -= nums[left];
      left++;
    }
  }
  return maxSum;
};


// 练习
var maxSubArray10 = function (nums) {
  let curMax = Number.MIN_SAFE_INTEGER, maxSum = Number.MIN_SAFE_INTEGER;
  for (let num of nums) {
    curMax = Math.max(num + curMax, num)
    maxSum = Math.max(maxSum, curMax);
  }

  return maxSum;
}
