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
  let stack = [], res = [];

  // 循环每个温度
  for (let i = 0; i < temperatures.length; i++) {
    // 如果当前温度比栈顶元素大，则将当前温度放入栈中,并将栈顶元素取出，放入结果数组中
    while (stack.length && temperatures[i] > temperatures[stack[0]]) {
      // 说明当前温度比栈顶元素大，则将当前温度的 index 放入栈中,并将栈顶元素取出，放入结果数组中
      let index = stack.shift();
      res[index] = i - index;
    }
    stack.unshift(i);
  }
  return res;
};
// @lc code=end


// 练习
var dailyTemperatures10 = function (temperatures) {
  let queue = [], res = new Array(temperatures.length).fill(0);
  for (let i = temperatures.length - 1; i >= 0; i--) {
    while (queue.length && temperatures[queue[queue.length - 1]] <= temperatures[i]) {
      queue.pop();
    }

    res[i] = queue.length ? queue[queue.length - 1] - i : 0
    queue.push(i);
  }

  return res;
}

