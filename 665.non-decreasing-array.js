/*
 * @lc app=leetcode id=665 lang=javascript
 *
 * [665] Non-decreasing Array
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */

// 这题的方法是按最小要改多少个才能保持ascending
var checkPossibility = function (nums) {
  let cnt = 0; //the number of changes
  for (let i = 1; i < nums.length && cnt <= 1; i++) {
    // 现在的比前一个小
    if (nums[i - 1] > nums[i]) {
      cnt += 1;

      // if (cnt > 1) {
      //   return false;
      // }

      // 那么要是要改的话（改前面大的那个），要么比前一个大，要么比前两个大，否则就没机会了
      if (i - 2 < 0 || nums[i - 2] <= nums[i]) {
        nums[i - 1] = nums[i];
      }
      //modify nums[i-1] of a priority
      else {
        nums[i] = nums[i - 1]; //have to modify nums[i]
      }
    }

    console.log(nums);
  }
  return true;
};

// checkPossibility([2, 3, 10, 5, 6]);
checkPossibility([3, 4, 2, 3]);
// @lc code=end
