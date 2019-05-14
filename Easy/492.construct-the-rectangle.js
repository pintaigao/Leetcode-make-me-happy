/**
 * @param {number} area
 * @return {number[]}
 */
var largestDividable = (area) => {
  for (let i = Math.sqrt(area) | 0; i > 0; i--) {
    if (area % i === 0) return i;
  }
}

var constructRectangle = function(area) {
  if (area === 0) return [0, 0];

  let w = largestDividable(area);
  let l = area / w;
  return [l, w];
};
