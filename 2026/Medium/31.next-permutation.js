/*
 * @lc app=leetcode id=31 lang=javascript
 *
 * [31] Next Permutation
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function (nums) {
  if (nums.length < 2) return; //特判
  let [min, flag] = [nums.length - 1, false]; //较大值中的最小值的下标初始化为n-1 和 用于判断是不是递减序列

  function swap(i, j) {
    let temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
  }

  /* 如果题目要求我们不能用js的reverse */
  /* function reverse(start) {
    let end = nums.length - 1;
    while (end > start) {
      swap(start, end);
      end--;
      start++;
    }
  } */

  /* 程序主体 */
  for (let i = nums.length - 1; i > 0; i--) {
    // 如果这个数比它的前一个数大
    if (nums[i] > nums[i - 1]) {
      //则它的前一个（小的）应该交换到：它后面的第一个比它大的（较大数中的最小数）
      while (nums[i - 1] >= nums[min]) {
        min--;
      }
      swap(i - 1, min); //先交换，交换之后i-1后面的元素一定是降序的。

      //再从i开始到后面反转 reverse(i);
      nums = nums.splice(0, i).concat(nums.reverse());
      console.log(nums);
      flag = true; //有交换就不是递减数组
      break;
    }
  }

  return flag ? nums : nums.sort((a, b) => a - b); //flag没变说明是递减数组，那就递增排nums
};

console.log(nextPermutation([1, 2, 3]));

// @lc code=end
