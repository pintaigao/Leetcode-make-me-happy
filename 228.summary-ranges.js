/*
 * @lc app=leetcode id=228 lang=javascript
 *
 * [228] Summary Ranges
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {string[]}
 */
var summaryRanges = function (nums) {
  if (!nums.length) {
    return [];
  }
  let pointer = 0;
  let result = [];

  for (let i = 0; i < nums.length; i++) {
    pointer = i;
    while (
      i !== nums.length &&
      pointer !== nums.length - 1 &&
      nums[pointer + 1] === nums[pointer] + 1
    ) {
      pointer += 1;
    }
    if (pointer === i) {
      result.push(nums[i] + "");
    } else {
      let string = nums[i] + "->" + nums[pointer];
      result.push(string);
    }

    i = pointer;
  }
  return result;
};

summaryRanges([0, 2, 3, 4, 6, 8, 9]);
// @lc code=end
