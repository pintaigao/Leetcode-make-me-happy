/*
 * @lc app=leetcode id=946 lang=javascript
 *
 * [946] Validate Stack Sequences
 */

// @lc code=start
/**
 * @param {number[]} pushed
 * @param {number[]} popped
 * @return {boolean}
 */
// Approach 1: Greedy
// 启蒙：We have to push the items in order, so when do we pop them?
var validateStackSequences = function (pushed, popped) {
  let N = pushed.length;
  let stack = [];

  let count = 0;
  // 模拟
  for (let x of pushed) {
    stack.unshift(x);
    // 如果我们现在pop stack，那么pop出来的元素，和popped[0]（popped.top）应该是相等的
    while (stack.length !== 0 && j < N && stack[0] == popped[0]) {
      // 移除已经检查过的元素
      stack.shift();
      popped.shift();
      count += 1;
    }
  }

  return count == N;
};

validateStackSequences([1, 2, 3, 4, 5], [4, 5, 3, 2, 1]);
// @lc code=end
