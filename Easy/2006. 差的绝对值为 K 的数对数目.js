/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countKDifference = function (nums, k) {
  let ans = 0, fixNums = null
  function traveler(start) {
    if (start > nums.length) return;
    if (Math.abs(fixNums - nums[start]) === k) {
      ans += 1;
    }

    traveler(start + 1);
  }

  for (let i = 0; i < nums.length; i++) {
    fixNums = nums[i];
    traveler(i + 1);
  }

  return ans
};