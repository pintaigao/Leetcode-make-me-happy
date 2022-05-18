/*
 * @lc app=leetcode id=452 lang=javascript
 *
 * [452] Minimum Number of Arrows to Burst Balloons
 */

// @lc code=start
/**
 * @param {number[][]} points
 * @return {number}
 */
var findMinArrowShots = function (points) {
  if (points.length == 0) return 0;

  // sort by x_end
  points.sort((a, b) => a[1] - b[1]);
  let arrowCnt = 1;

  // 取第一个点的末端作为箭头的起始点
  let arrowPos = points[0][1];
  // loop这个气球的所有点
  for (let i = 1; i < points.length; i++) {
    // 如果这个气球的前端小于箭头的位置，说明现在这个气球可以被刺破
    if (arrowPos >= points[i][0]) {
      continue;
    }
    // 否则，更新箭头位置为现在这个气球的末端。result+1
    arrowCnt += 1;
    arrowPos = points[i][1];
  }
  return arrowCnt;
};
// @lc code=end
