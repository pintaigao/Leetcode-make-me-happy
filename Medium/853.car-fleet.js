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
var carFleet = function (target, pos, speed) {
  let N = pos.length,
    res = 0;

  let cars = new Array(N).fill(null).map((_) => {
    return new Array(2);
  });

  for (let i = 0; i < N; ++i) {
    // (target - pos[i]) / speed[i] = 到达终点所花的时间
    cars[i] = [pos[i], (target - pos[i]) / speed[i]];
  }

  // sort by position
  cars.sort((a, b) => a[0] - b[0]);

  console.log(cars);

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

// Solution 2: Map
var carFleet2 = function (target, position, speed) {
  let map = new Map(),
    result = position.length;
  for (let i = 0; i < position.length; i++) {
    map.set(position[i], speed[i]);
  }
  position.sort((a, b) => a - b);
  let pre = -Infinity;
  for (let j = position.length - 1; j >= 0; j--) {
    if ((target - position[j]) / map.get(position[j]) <= pre) {
      result--;
    } else {
      pre = (target - position[j]) / map.get(position[j]);
    }
  }
  return result;
};
// @lc code=end
carFleet(12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3]);
