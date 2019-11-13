/*
 * @lc app=leetcode id=240 lang=javascript
 *
 * [240] Search a 2D Matrix II
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
    let direction = [[0, 1], [1, 0]];

    let n = matrix.length;
    let m = matrix[0].length;

    let col = 0, row = 0;
    while (col !== m && row !== m) {
        if (matrix[col][row] < target) {
            col += 1;
        } else if(matrix[row][col] > target) {
            row ++
        }
    }
};
// @lc code=end

