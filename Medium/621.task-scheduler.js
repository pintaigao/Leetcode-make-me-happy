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
  for (let t of tasks) { frequencies[t.charCodeAt(0) - "A".charCodeAt(0)]++ }
  // 按照出现次数排序
  frequencies.sort((a, b) => a - b);
  // max frequency222
  // 找到出现次数最多的字母的个数，配合间隔 n，获得 idle 时间：A_ _ _ A _ _ _ A _ _ _ :即表示 A 运行后必须_ _ _时间后才能再次运行
  let f_max = frequencies[25], idle_time = (f_max - 1) * n;

  // 然后将剩下的插入在 _ 中，从倒数第二个开始看
  for (let i = frequencies.length - 2; i >= 0 && idle_time > 0; i--) {
    // 总共 idle 时间 - 字母出现次数
    // 能被消耗的 idle time，A_ _ A _ _ A 因为不能连续放入相同的字母，所以每一次最多能消耗 f_max - 1 个 idle time（或者字母出现的次数）
    if (frequencies[i] < f_max - 1) {
      idle_time -= frequencies[i];
    } else {
      idle_time -= f_max - 1;
    }
  }
  // 如果 idle 被减成负数了呢？ idle 变回 0
  idle_time = Math.max(0, idle_time);

  return idle_time + tasks.length;
};
// @lc code=end
