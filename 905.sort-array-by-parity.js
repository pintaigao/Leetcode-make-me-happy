/*
 * @lc app=leetcode id=905 lang=javascript
 *
 * [905] Sort Array By Parity
 */

// @lc code=start
/**
 * @param {number[]} A
 * @return {number[]}
 */

// 1. Sort
var sortArrayByParity = function (A) {
  let B = A.slice();
  B.sort((a, b) => {
    return (a % 2) - (b % 2);
  });

  // console.log(B);
  // for (let t = 0; t < A.length; ++t) A[t] = B[t];
  return B;
};

// 2. Quick Sort
let sortArrayByParity2 = function (A) {
  let i = -1;
  for (let j = 0; j < A.length; j++) {
    if (A[j] % 2 == 0) {
      i += 1;
      let tmp = A[i];
      A[i] = A[j];
      A[j] = tmp;
    }
  }
  return A;
};

// 3. Two Pass
let sortArrayByParity3 = function (A) {
  let ans = [];
  let t = 0;

  for (let i = 0; i < A.length; ++i)
    if (A[i] % 2 == 0) {
      ans[t] = A[i];
      t += 1;
    }
  for (let i = 0; i < A.length; ++i)
    if (A[i] % 2 == 1) {
      ans[t] = A[i];
      t += 1;
    }

  return ans;
};

// In place
let sortArrayByParity4 = function (A) {
  let i = 0,
    j = A.length - 1;
  while (i < j) {
    if (A[i] % 2 === 1 && A[j] % 2 === 0) {
      let tmp = A[i];
      A[i] = A[j];
      A[j] = tmp;
    }

    if (A[i] % 2 == 0) i++;
    if (A[j] % 2 == 1) j--;
  }

  return A;
};

sortArrayByParity([3, 1, 2, 4]);
// @lc code=end
