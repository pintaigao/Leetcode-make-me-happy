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
// Binary Search的方法 O(logn) O(1)
var singleNonDuplicate = function (nums) {
  let lo = 0;
  let hi = nums.length - 1;

  while (lo < hi) {
    let mid = lo + (hi - lo) / 2;
    // 后半段如果是even的说明后半段都是两个两个相同的数字
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
      // [1,1,2,3,3]的情况
      return nums[mid];
    }
  }
  return nums[lo];
};
// @lc code=end
