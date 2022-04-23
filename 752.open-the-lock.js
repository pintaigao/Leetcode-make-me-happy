/*
 * @lc app=leetcode id=752 lang=javascript
 *
 * [752] Open the Lock
 */

// @lc code=start
/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */

/* BFS的方法，每个queue里都是“转一次（level）”所得到的组合*/
var openLock = function (deadends, target) {
  let q = [];
  let deads = new Set(deadends);
  let visited = new Set();

  // 1
  q.push("0000");
  visited.add("0000");

  let level = 0;

  while (q.length) {
    let size = q.length;
    while (size > 0) {
      let s = q.shift();
      if (deads.has(s)) {
        size -= 1;
        continue;
      }
      if (s === target) return level;
      let sb = s + "";

      for (let i = 0; i < 4; i++) {
        let c = sb[i];
        // 转盘顺叙，s1相当于把sb[i]换成下一个数字
        let s1 =
          sb.substring(0, i) +
          (c === "9" ? 0 : parseInt(c) + 1) +
          sb.substring(i + 1);
        console.log(s1);
        // 转盘倒叙，s2相当于把sb[i]换成上一个数字
        let s2 =
          sb.substring(0, i) +
          (c == "0" ? 9 : c - "0" - 1) +
          sb.substring(i + 1);
        console.log(s2);

        if (!visited.has(s1) && !deads.has(s1)) {
          q.push(s1);
          visited.add(s1);
        }
        if (!visited.has(s2) && !deads.has(s2)) {
          q.push(s2);
          visited.add(s2);
        }
      }
      console.log("Let's see the queue");
      console.log(q);
      console.log();
      // 讨论完了以它（queue.shift()）为base，转一次的所有可能情况，并push到queue中，为下一次讨论作准备，size减1
      size -= 1;
    }

    level += 1;
  }
  return -1;
};
// @lc code=end
