/*
 * @lc app=leetcode id=832 lang=javascript
 *
 * [832] Flipping an Image
 */
/**
 * @param {number[][]} A
 * @return {number[][]}
 */
var flipAndInvertImage = module.exports = function (A) {
  let N = A.length;
  let returnArray = Array(N).fill(0).map(() => Array(N).fill("0"));

  for (let i = 0; i < N; i++)
    for (let j = 0; j < N; j++)
      returnArray[i][j] = A[i][N - 1 - j] == 0 ? 1 : 0;

  return returnArray;

};

