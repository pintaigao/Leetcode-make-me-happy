/*
 * @lc app=leetcode id=223 lang=javascript
 *
 * [223] Rectangle Area
 */

// @lc code=start
/**
 * @param {number} A
 * @param {number} B
 * @param {number} C
 * @param {number} D
 * @param {number} E
 * @param {number} F
 * @param {number} G
 * @param {number} H
 * @return {number}
 */
var computeArea = function (A, B, C, D, E, F, G, H) {
  function findArea(x1, y1, x2, y2) {
    return (x1 - x2) * (y1 - y2);
  }

  const area1 = findArea(A, B, C, D);
  const area2 = findArea(E, F, G, H);
  let area3 = 0;

  const xStart = Math.max(A, E);
  const xEnd = Math.min(C, G);
  const yStart = Math.max(B, F);
  const yEnd = Math.min(D, H);

  // check if the rectangles overlap
  if (xStart <= xEnd && yStart <= yEnd) {
    area3 = findArea(xStart, yStart, xEnd, yEnd);
  }
  return area1 + area2 - area3;
};
// @lc code=end
