/*
 * @lc app=leetcode id=223 lang=javascript
 *
 * [223] Rectangle Area
 */

// @lc code=start
/**
 * @param {number} ax1
 * @param {number} ay1
 * @param {number} ax2
 * @param {number} ay2
 * @param {number} bx1
 * @param {number} by1
 * @param {number} bx2
 * @param {number} by2
 * @return {number}
 */
var computeArea = function (ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) {
  function findArea(x1, y1, x2, y2) {
    return (x1 - x2) * (y1 - y2);
  }

  const area1 = findArea(ax1, ay1, ax2, ay2);
  const area2 = findArea(bx1, by1, bx2, by2);
  let area3 = 0;

  const xStart = Math.max(ax1, bx1);
  const xEnd = Math.min(ax2, bx2);
  const yStart = Math.max(ay1, by1);
  const yEnd = Math.min(ay2, by2);

  // check if the rectangles overlap
  if (xStart <= xEnd && yStart <= yEnd) {
    area3 = findArea(xStart, yStart, xEnd, yEnd);
  }
  return area1 + area2 - area3;
};
// @lc code=end
