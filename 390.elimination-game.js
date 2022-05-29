/*
 * @lc app=leetcode id=390 lang=javascript
 *
 * [390] Elimination Game
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var lastRemaining = function (n) {
  let [left, remaining, step, head] = [true, n, 1, 1];
  while (remaining > 1) {
    if (left || remaining % 2 == 1) {
      head = head + step;
    }
    remaining = parseInt(remaining / 2);
    step = step * 2;
    left = !left;
  }

  return head;
};
// @lc code=end
