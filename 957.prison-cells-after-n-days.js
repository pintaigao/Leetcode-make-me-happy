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
/* 
  如果一间牢房的两个相邻的房间都被占用或都是空的，那么该牢房就会被占用。
  否则，它就会被空置。
*/

// 普通人的做法
var prisonAfterNDays = function (cells, n) {
  // 根据条件，生成下一日的cell
  let nextDay = function (cells) {
    let nextDayCell = cells.map(() => 0);
    for (let i = 1; i < cells.length - 1; i++) {
      nextDayCell[i] = cells[i - 1] == cells[i + 1] ? 1 : 0;
    }
    return nextDayCell;
  };

  if (cells == null || cells.length == 0 || n <= 0) {
    return cells;
  }

  let hasCycle = false;
  let cycle = 0;
  let set = new Set();

  // 每天一循环
  for (let i = 0; i < n; i++) {
    // 生成下一日的Cell
    let nextDayCell = nextDay(cells);
    let key = nextDayCell.join("");
    if (!set.has(key)) {
      // 如果下一日的cell没有出现过，则把下一日的cell放入set
      set.add(key);
      cycle += 1;
    } else {
      // 如果下一日的cell出现过，则说明有循环
      hasCycle = true;
      break;
    }
    cells = nextDayCell;
  }

  if (hasCycle) {
    // 假设10天每4天循环一次，则2次循环后10%4=2，第二天的则为结果
    n %= cycle;
    for (let i = 0; i < n; i++) {
      cells = nextDay(cells);
    }
  }

  return cells;
};
// @lc code=end
