/*
 * @lc app=leetcode id=973 lang=javascript
 *
 * [973] K Closest Points to Origin
 */
/**
 * @param {number[][]} points
 * @param {number} K
 * @return {number[][]}
 */
var kClosest = function (points, K) {
  let diff = (point) => {
    return point[0] * point[0] + point[1] * point[1];
  };

  let array = [];
  for (let i = 0; i < points.length; i++) {
    array[i] = diff(points[i]);
  }

  console.log(array);

  // 为什么要这样呢，因为js的sort是将元素先转换成字符串再按字符串比较
  array.sort((a, b) => {
    return a - b;
  });

  let max = array[K - 1];
  let result = [];

  for (let i = 0; i < points.length; i++) {
    if (diff(points[i]) <= max) {
      result.push(points[i]);
    }
  }

  return result;
};

kClosest(
  [
    [3, 3],
    [5, -1],
    [-2, 4],
  ],
  2
);
