/*
 * @lc app=leetcode id=739 lang=javascript
 *
 * [739] Daily Temperatures
 */

// @lc code=start
/**
 * @param {number[]} temperatures
 * @return {number[]}
 */

// Solution 1: Stack
var dailyTemperatures = function (temperatures) {
  let stack = [];
  let res = [];

  // 循环每个温度
  for (let i = 0; i < temperatures.length; i++) {
    // 如果当前温度比栈顶元素大，则将当前温度放入栈中,并将栈顶元素取出，放入结果数组中
    while (stack.length && temperatures[i] > temperatures[stack[0]]) {
      let index = stack.shift();
      res[index] = i - index;
    }
    stack.unshift(i);
  }
  return res;
};
// @lc code=end
