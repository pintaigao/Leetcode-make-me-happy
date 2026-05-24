/*
 * @lc app=leetcode id=456 lang=javascript
 *
 * [456] 132 Pattern
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var find132pattern = function (nums) {
  let stack = [], n = nums.length, k = Number.NEGATIVE_INFINITY;

  for (let i = n - 1; i >= 0; --i) {
    if (nums[i] < k) {
      return true;
    }
    // 实现从栈顶到栈底单调递减的队列
    // 如果入栈元素大于栈顶，栈顶一直出栈，知道栈顶的元素大于入栈，实现单调递减的效果
    while (stack && stack[stack.length - 1] < nums[i]) {
      // 1. 先出栈
      let value = stack.pop();
      // 2. 再运行逻辑的东西， k代表栈里面第二大的元素
      k = Math.max(k, value);
    }

    stack.push(nums[i]);
  }

  return false;
};
// @lc code=end
