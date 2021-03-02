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
// Intuition
// We have to push the items in order, so when do we pop them?

var validateStackSequences = function (pushed, popped) {
  let N = pushed.length;
  let stack = [];

  // pointer J
  let j = 0;
  for (let x of pushed) {
    stack.unshift(x);
    while (stack.length !== 0 && j < N && stack[0] == popped[0]) {
      stack.shift();
      popped.shift();
      j += 1;
    }
  }

  return j == N;
};

validateStackSequences([1, 2, 3, 4, 5], [4, 5, 3, 2, 1]);
// @lc code=end
