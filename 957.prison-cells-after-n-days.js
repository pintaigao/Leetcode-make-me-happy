/*
 * @lc app=leetcode id=957 lang=javascript
 *
 * [957] Prison Cells After N Days
 */

// @lc code=start
/**
 * @param {number[]} cells
 * @param {number} n
 * @return {number[]}
 */

// 这种题目没有直观洞察力的话就只能这么干了，按照普通人的思维
var prisonAfterNDays = function (cells, n) {
  // 检测的核心
  let nextDay = function (cells) {
    let tmp = new Array(cells.length).fill(0);
    for (let i = 1; i < cells.length - 1; i++) {
      tmp[i] = cells[i - 1] == cells[i + 1] ? 1 : 0;
    }
    return tmp;
  };

  if (cells == null || cells.length == 0 || n <= 0) {
    return cells;
  }

  let hasCycle = false;
  let cycle = 0;
  let set = new Set();

  for (let i = 0; i < n; i++) {
    let next = nextDay(cells);
    let key = next.join("");
    if (!set.has(key)) {
      //store cell state
      set.add(key);
      cycle += 1;
    } else {
      //hit a cycle
      hasCycle = true;
      break;
    }
    cells = next;
  }

  if (hasCycle) {
    n %= cycle;
    for (let i = 0; i < n; i++) {
      cells = nextDay(cells);
    }
  }

  return cells;
};

// @lc code=end
