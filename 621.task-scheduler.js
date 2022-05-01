/*
 * @lc app=leetcode id=621 lang=javascript
 *
 * [621] Task Scheduler
 */

// @lc code=start
/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
// 方法一: Greedy
var leastInterval = function (tasks, n) {
  // frequencies of the tasks
  let frequencies = new Array(26).fill(0);

  // 每个字母出现的次数
  for (let t of tasks) {
    frequencies[t.charCodeAt(0) - "A".charCodeAt(0)]++;
  }

  // 按照出现次数排序
  frequencies.sort((a, b) => {
    return a - b;
  });

  console.log(frequencies);

  // max frequency
  let f_max = frequencies[25];

  let idle_time = (f_max - 1) * n;
  console.log(`this is the idle_time: ${idle_time}`);

  for (let i = frequencies.length - 2; i >= 0 && idle_time > 0; i--) {
    idle_time -= Math.min(f_max - 1, frequencies[i]);
  }
  idle_time = Math.max(0, idle_time);

  return idle_time + tasks.length;
};
// @lc code=end
