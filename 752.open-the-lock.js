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

// 这一题好像只能BFS来做
// 1.Base Solution
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
        // 从前往后？
        let s1 =
          sb.substring(0, i) +
          (c == "9" ? 0 : c - "0" + 1) +
          sb.substring(i + 1);
        console.log(s1);
        // 从后往前？
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
      size -= 1;
    }

    level += 1;
  }
  return -1;
};

openLock(["0201", "0101", "0102", "1212", "2002"], "0202");
// @lc code=end
