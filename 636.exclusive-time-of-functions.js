/*
 * @lc app=leetcode id=636 lang=javascript
 *
 * [636] Exclusive Time of Functions
 */

// @lc code=start
/**
 * @param {number} n
 * @param {string[]} logs
 * @return {number[]}
 */
/* 方法一：栈 */
var exclusiveTime = function (n, logs) {
  let stack = [];
  let res = new Array(n).fill(0);
  let [function_id, action, time] = logs[0].split(":");
  stack.unshift(function_id);
  // i：当前查看的index。prev：下一个开始前已经经过的时间
  let [i, prev] = [1, 0];
  // 一个一个来看
  while (i < logs.length) {
    [function_id, action, time] = logs[i].split(":");
    // 如果action是start
    if (action === "start") {
      // 如果stack里面还有，说明要停掉当前的function_id，统计上一个function_id一共运行了多长时间
      if (stack.length) res[stack[0]] += time - prev;
      // 把新的function_id放入到stack中
      stack.unshift(function_id);
      // 相当于记录上一个function_id停止时候的时间（即目前这个function_id开始的时间）
      prev = +time;
    } else {
      // action是end，结束目前这个function_id,统计其运行了多长时间，并把它从stack中移除
      res[stack[0]] += +time - prev + 1;
      stack.shift();
      // 下一段function_id开始的时间
      prev = +time + 1;
    }
    i += 1;
  }
  return res;
};
// @lc code=end
