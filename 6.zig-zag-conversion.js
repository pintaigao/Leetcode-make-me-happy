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
var convert = function (s, numRows) {
  if (numRows == 1) return s;

  let rows = [];
  for (let i = 0; i < Math.min(numRows, s.length()); i++) rows.push("");

  let curRow = 0;
  let goingDown = false;

  for (let c of s.split("")) {
    rows[curRow] += c;
    if (curRow == 0 || curRow == numRows - 1) goingDown = !goingDown;
    curRow += goingDown ? 1 : -1;
  }

  let ret = "";
  for (let row of rows) ret += row;
  return ret;
};

console.log("PAYPALISHIRING", 4);
// @lc code=end
