/*
 * @lc app=leetcode id=836 lang=javascript
 *
 * [836] Rectangle Overlap
 */

// @lc code=start
/**
 * @param {number[]} rec1
 * @param {number[]} rec2
 * @return {boolean}
 */
var isRectangleOverlap = function (rec1, rec2) {
  // check if either rectangle is actually a line
  if (
    rec1[0] == rec1[2] ||
    rec1[1] == rec1[3] ||
    rec2[0] == rec2[2] ||
    rec2[1] == rec2[3]
  ) {
    // the line cannot have positive overlap
    return false;
  }

  return !(
    // 一定不相交的四种情况
    (
      rec1[2] <= rec2[0] || // left
      rec1[3] <= rec2[1] || // bottom
      rec1[0] >= rec2[2] || // right
      rec1[1] >= rec2[3]
    )
  ); // top
};
// @lc code=end
