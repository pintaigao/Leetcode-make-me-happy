/*
 * @lc app=leetcode id=71 lang=javascript
 *
 * [71] Simplify Path
 */

// @lc code=start
/**
 * @param {string} path
 * @return {string}
 */
var simplifyPath = function (path) {
  let stack = [];
  let path = path.split("/");

  for (let item of path) {
    if (item == "..") {
      if (stack.length) {
        stack.pop();
      }
    } else if (item && item != ".") {
      stack.push(item);
    }
  }
  return "/" + stack.join("/");
};
// @lc code=end
