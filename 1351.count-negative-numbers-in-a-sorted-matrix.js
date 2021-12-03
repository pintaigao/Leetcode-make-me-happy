/*
 * @lc app=leetcode id=1351 lang=javascript
 *
 * [1351] Count Negative Numbers in a Sorted Matrix
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var countNegatives = function (grid) {
  let rows = grid.length;
  let cols = grid[0].length;
  let count = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] < 0) {
        count += grid[i].length - j; // since the array is sorted, as soon as first negative is found, remaining can be counted instantly and no need to traverse any more.
        break;
      }
    }
  }
  return count;
};

// 2. Binary Search
let countNegatives2 = function (grid) {
  let rows = grid.length,
    cols = grid[0].length;
  let res = 0,
    lastNeg = cols - 1;
  for (let row = 0; row < rows; row++) {
    //check edge cases - if first element is < 0 - all elements in row are negative
    if (grid[row][0] < 0) {
      res += cols;
      continue;
    }

    //if last element is positive - it means there are no negative numbers in a row
    if (grid[row][cols - 1] > 0) continue;
    //there is a mix of negative and positive ones, need to find the border. starting

    //binary search
    let l = 0,
      r = lastNeg;
    while (l <= r) {
      let m = l + parseInt((r - l) / 2);
      if (grid[row][m] < 0) r = m - 1;
      else l = m + 1;
    }
    //l points to the first negative element, which means cols - l is a number of
    //such elements
    res += cols - l;
    lastNeg = l;
  }
  return res;
};

// 3. Fastest Solution
let countNegatives = function (grid) {
  let count = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] < 0) {
        count++;
      }
    }
  }
  return count;
};
// @lc code=end
