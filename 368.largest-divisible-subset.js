/*
 * @lc app=leetcode id=368 lang=javascript
 *
 * [368] Largest Divisible Subset
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
/* 动态规划 */
var largestDivisibleSubset = function (nums) {
  // Test case with empty set.
  let n = nums.length;
  if (n == 0) return [];

  // Container to keep the largest divisible subset that ends with each of the nums.
  let EDS = [];
  for (let num of nums) EDS.push([]);

  console.log(EDS);

  /* Sort the original list in ascending order. */
  nums.sort((a, b) => a - b);

  /* Calculate all the values of EDS(X_i) */
  for (let i = 0; i < nums.length; ++i) {
    let maxSubset = [];

    // Find the largest divisible subset of previous elements.
    for (let k = 0; k < i; ++k) {
      if (nums[i] % nums[k] == 0 && maxSubset.length < EDS[k].length) {
        maxSubset = EDS[k];
      }
    }

    // Extend the found subset with the element itself.
    EDS[i] = [...EDS[i], ...maxSubset];
    EDS[i].push(nums[i]);
    console.log(EDS);
  }
  /* Find the largest of EDS values  */
  let ret = [];
  for (let i = 0; i < n; ++i) {
    if (ret.length < EDS[i].length) {
      ret = EDS[i];
    }
  }

  return ret;
};

/* 动态规划写法2 出处：https://leetcode.cn/problems/largest-divisible-subset/solution/zui-da-zheng-chu-zi-ji-by-leetcode-solut-t4pz/ */
var largestDivisibleSubset = function (nums) {
  nums.sort((a, b) => a - b);

  // 第 1 步：动态规划找出最大子集的个数、最大子集中的最大整数
  // 初始化：dp[i] 表示在输入数组nums升序排列的前提下，以nums[i]为最大整数的【整除子集】的大小
  const dp = new Array(nums.length).fill(1);
  let [maxSize, maxVal] = [1, dp[0]];
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      // 题目中说「没有重复元素」很重要
      // 以该点为首，一个一个往前试，看是否能整除
      if (nums[i] % nums[j] === 0) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }

    if (dp[i] > maxSize) {
      maxSize = dp[i];
      maxVal = nums[i];
    }
  }

  // 第 2 步：倒推获得最大子集
  const res = [];
  if (maxSize === 1) {
    res.push(nums[0]);
    return res;
  }

  for (let i = nums.length - 1; i >= 0 && maxSize > 0; i--) {
    if (dp[i] === maxSize && maxVal % nums[i] === 0) {
      res.push(nums[i]);
      maxVal = nums[i];
      maxSize--;
    }
  }
  return res;
};
// @lc code=end
