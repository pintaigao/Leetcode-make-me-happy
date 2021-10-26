/*
 * @lc app=leetcode id=853 lang=javascript
 *
 * [853] Car Fleet
 */

// @lc code=start
/**
 * @param {number} target
 * @param {number[]} position
 * @param {number[]} speed
 * @return {number}
 */

// Straight Forward Method
var carFleet = function (target, pos, speed) {
  let N = pos.length,
    res = 0;
  let cars = new Array(N).fill(null).map((_) => {
    return new Array(2);
  });
  for (let i = 0; i < N; ++i) {
    cars[i] = [pos[i], (target - pos[i]) / speed[i]];
  }

  cars.sort((a, b) => a[0] - b[0]);
  let cur = 0;

  // 倒叙，有些车永远追不上了
  for (let i = N - 1; i >= 0; --i) {
    if (cars[i][1] > cur) {
      cur = cars[i][1];
      res += 1;
    }
  }
  return res;
};
// @lc code=end
