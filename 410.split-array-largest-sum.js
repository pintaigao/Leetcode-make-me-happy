/*
 * @lc app=leetcode id=410 lang=javascript
 *
 * [410] Split Array Largest Sum
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} m
 * @return {number}
 */
/* 1.二分查找 */
var splitArray = function (nums, m) {
  let max = 0;
  let sum = 0;

  /***
   * @param maxIntervalSum 子数组各自的和的最大值
   * @return 满足不超过「子数组各自的和的最大值」的分割数
   */
  let split = function (maxIntervalSum) {
    // 至少是一个分割
    let splits = 1;
    // 当前区间的和
    let curIntervalSum = 0;
    for (let num of nums) {
      // 尝试加上当前遍历的这个数，如果加上去超过了「子数组各自的和的最大值」，就不加这个数，另起炉灶
      if (curIntervalSum + num > maxIntervalSum) {
        curIntervalSum = 0;
        splits++;
      }
      curIntervalSum += num;
    }
    return splits;
  };

  // 计算「子数组各自的和的最大值」的上下界
  // 记录最大的数字 (没有比它更小的和了)，和整个数组的和 (m=0)
  for (let num of nums) {
    max = Math.max(max, num);
    sum += num;
  }

  // 使用「二分查找」确定一个恰当的「子数组各自的和的最大值」，
  // 使得它对应的「子数组的分割数」恰好等于 m
  let left = max;
  let right = sum;
  while (left < right) {
    let mid = parseInt((left + right) / 2);

    let splits = split(mid);
    if (splits > m) {
      // 如果分割数太多，说明「子数组各自的和的最大值」太小，此时需要将「子数组各自的和的最大值」调大
      // 下一轮搜索的区间是 [mid + 1, right]
      left = mid + 1;
    } else {
      // 下一轮搜索的区间是上一轮的反面区间 [left, mid]
      right = mid;
    }
  }
  return left;
};

// @lc code=end
