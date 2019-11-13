/*
 * @lc app=leetcode id=867 lang=javascript
 *
 * [867] Transpose Matrix
 */
/**
 * @param {number[][]} A
 * @return {number[][]}
 */
var transpose = function (A) {

  let i = 0;
  let j = 0;
  let outPutArr = [];

  while (i < A[0].length) {
    let temp = [];
    while (j < A.length) {
      temp.push(A[j][i])
      j++
    }
    outPutArr.push(temp)
    j = 0
    i++
  }
  return outPutArr
};

