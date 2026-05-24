/**
 * @param {number[]} heights
 * @return {number[]}
 */
var findBuildings = function (heights) {
  let list = [];
  let max = 0;
  for (let i = heights.length - 1; i >= 0; i--) {
    if (heights[i] > max) {
      list.unshift(i);
      max = heights[i];
    }
  }
  return list;
};
