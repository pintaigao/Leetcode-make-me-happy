/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumDifference = function (nums) {
  let minNum = Number.MAX_SAFE_INTEGER, maxProfit = Number.MIN_SAFE_INTEGER

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] < minNum) {
      minNum = nums[i];
    }

    if (nums[i] !== minNum && nums[i] > minNum && nums[i] - minNum > maxProfit) {
      maxProfit = nums[i] - minNum
    }
  }

  return maxProfit === Number.MIN_SAFE_INTEGER ? -1 : maxProfit
};