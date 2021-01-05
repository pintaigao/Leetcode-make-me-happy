/*
 * @lc app=leetcode id=997 lang=javascript
 *
 * [997] Find the Town Judge
 */
/**
 * @param {number} N
 * @param {number[][]} trust
 * @return {number}
 */
var findJudge = function (N, trust) {
  let map = new Array(N).fill(0),
    length = trust.length;
  for (let i = 0; i < length; i++) {
    if (map[trust[i][1] - 1] != -1) {
      map[trust[i][1] - 1]++;
    }
    map[trust[i][0] - 1] = -1;
  }
  let index = map.indexOf(N - 1);
  return index > -1 ? index + 1 : -1;
};
