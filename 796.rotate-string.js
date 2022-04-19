/*
 * @lc app=leetcode id=796 lang=javascript
 *
 * [796] Rotate String
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string} goal
 * @return {boolean}
 */

/* Solution 1: 首尾相连 */
var rotateString = function (s, goal) {
  return s.length === goal.length && (s + s).includes(goal);
};

/* Solution 2: KMP */
var rotateString2 = function (s, goal) {};
// @lc code=end
