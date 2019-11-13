/*
 * @lc app=leetcode id=274 lang=javascript
 *
 * [274] H-Index
 */
/**
 * @param {number[]} citations
 * @return {number}
 */
function hIndex(citations) {
  var map = {};
  var h = citations.length;
  var i = 0;
  var max = 0;
  citations.map(c => map[c] = map[c] ? map[c] + 1 : 1);
  console.log(map);
  for (; i <= h; i++) {
    max = Math.max(max, h >= i ? i : 0);
    h -= map[i] ? map[i] : 0;
  }
  return max;
}

hIndex([3,0,6,1,5]);

