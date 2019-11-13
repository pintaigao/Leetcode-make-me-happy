/*
 * @lc app=leetcode id=561 lang=javascript
 *
 * [561] Array Partition I
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var sortArrayByParityII = function (A) {
  let i = 0;
  let j = 1;
  while (i < A.length && j < A.length) {
    if (isEven(i) && isEven(A[i])) {
      i = i + 2;
      continue;
    }
    if (!isEven(j) && !isEven(A[j])) {
      j = j + 2;
      continue;
    }
    [A[i], A[j]] = [A[j], A[i]];
  }
  return A;
};

const isEven = x => x % 2 === 0;


arrayPairSum([6214, -2290, 2833, -7908]);

