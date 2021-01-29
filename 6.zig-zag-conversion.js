/*
 * @lc app=leetcode id=6 lang=javascript
 *
 * [6] ZigZag Conversion
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */

// 1. Visit By Column
var convert = function (s, numRows) {
  if (numRows == 1) return s;

  let rows = [];

  // 先决定有多少行
  for (let i = 0; i < Math.min(numRows, s.length); i++) {
    rows.push("");
  }

  let curRow = 0;
  let goingDown = false;

  for (let c of s.split("")) {
    rows[curRow] += c;
    if (curRow == 0 || curRow == numRows - 1) goingDown = !goingDown;
    curRow += goingDown ? 1 : -1;
    //所以完全不用管column的增加，就是上下上下的读
  }

  console.log(rows);

  let ret = "";
  for (let row of rows) ret += row;
  console.log(ret);
  return ret;
};

// 2. Visit By Column

convert("PAYPALISHIRING", 4);
// @lc code=end
