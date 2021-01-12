/*
 * @lc app=leetcode id=118 lang=javascript
 *
 * [118] Pascal's Triangle
 */

// @lc code=start
/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function (numRows) {
  if (!numRows || numRows <= 0) return [];

  const pascal = [[1]];

  for (let i = 1; i < numRows; i++) {
    const prevRow = pascal[pascal.length - 1];
    console.log("prevRow is: " + prevRow);
    const shiftLeft = [...prevRow, 0];
    console.log("shiftLeft is: " + shiftLeft);
    const shiftRight = [0, ...prevRow];
    console.log("shiftRight is: " + shiftRight);

    const currentRow = shiftLeft.map((r, i) => r + shiftRight[i]);
    pascal.push(currentRow);
    console.log(" ");
  }

  return pascal;
};
// @lc code=end

generate(4);
