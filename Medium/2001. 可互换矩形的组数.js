/**
 * @param {number[][]} rectangles
 * @return {number}
 */
var interchangeableRectangles = function (rectangles) {
  let map = {}, ans = 0;

  for (let el of rectangles) {
    let tmp = el[0] / el[1];
    // 记录el[0] / el[1]出现的次数
    map[tmp] = (map[tmp] || 0) + 1;
  }

  for (let [key, value] of Object.entries(map)) {
    ans += (value * (value - 1)) / 2
  }
  return ans
};