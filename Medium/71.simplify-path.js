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

var simplifyPath = function (path) {
  let pathArray = path.split("/"), stack = [], res = "";
  // 借助栈计算最终的文件夹路径
  for (const part of pathArray) {
    if (part === "" || part === ".") {
      continue;
    }
    if (part === "..") {
      if (stack.length > 0) stack.pop();
      continue;
    }
    stack.push(part);
  }

  // 栈中存储的文件夹组成路径
  while (stack.length > 0) { res = "/" + stack.pop() + res }
  return res === "" ? "/" : res;
};
