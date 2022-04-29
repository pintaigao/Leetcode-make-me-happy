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
var checkPossibility = function (nums) {
  let cnt = 0; //the number of changes
  for (let i = 1; i < nums.length && cnt <= 1; i++) {
    // 如果现在的比前一个小
    if (nums[i - 1] > nums[i]) {
      cnt += 1;
      // 如果改了超过两个，返回false
      if (cnt > 1) {
        return false;
      }
      // 改前面这个大的话，最终结果要符合：前面这个比它的前一个相等或大，现在这个比前两个相等或大
      if (i - 2 < 0 || nums[i - 2] <= nums[i]) {
        // 最小预期为相等
        nums[i - 1] = nums[i];
      } else {
        // 如果现在这个比前两个都小（不符合上面的if规则），那么就改现在这个，最低要求为和前一个相等
        nums[i] = nums[i - 1];
      }
    }
  }
  return true;
};
// @lc code=end
