/*
 * @lc app=leetcode id=540 lang=javascript
 *
 * [540] Single Element in a Sorted Array
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */

// Brute Force的方法O(n) O(1)
var singleNonDuplicate = function (nums) {
  for (let i = 0; i < nums.length - 1; i += 2) {
    if (nums[i] != nums[i + 1]) {
      return nums[i];
    }
  }
  return nums[nums.length - 1];
};

// Binary Search的方法 O(logn) O(1)
let singleNonDuplicate = function (nums) {
  let lo = 0;
  let hi = nums.length - 1;

  while (lo < hi) {
    let mid = lo + (hi - lo) / 2;
    let halvesAreEven = (hi - mid) % 2 == 0;
    if (nums[mid + 1] == nums[mid]) {
      if (halvesAreEven) {
        lo = mid + 2;
      } else {
        hi = mid - 1;
      }
    } else if (nums[mid - 1] == nums[mid]) {
      if (halvesAreEven) {
        hi = mid - 2;
      } else {
        lo = mid + 1;
      }
    } else {
      return nums[mid];
    }
  }
  return nums[lo];
};
// @lc code=end
