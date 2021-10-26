/**
 * @param {number[][]} points
 * @return {number}
 */
var findMinArrowShots = function (points) {
  if (points.length == 0) return 0;

  // sort by x_end
  points.sort((a, b) => a[1] - b[1]);

  let arrowPos = points[0][1];
  let arrowCnt = 1;
  for (let i = 1; i < points.length; i++) {
    if (arrowPos >= points[i][0]) {
      continue;
    }
    arrowCnt += 1;
    arrowPos = points[i][1];
  }
  return arrowCnt;
};
