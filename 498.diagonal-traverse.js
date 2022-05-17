/*
 * @lc app=leetcode id=498 lang=javascript
 *
 * [498] Diagonal Traverse
 */

// @lc code=start
/**
 * @param {number[][]} mat
 * @return {number[]}
 */

/* Solution 1: Diagonal Iteration and Reversal */
var findDiagonalOrder = function (mat) {
  // 检查是否为空
  if (matrix == null || matrix.length == 0) {
    return [];
  }

  // Variables to track the size of the matrix
  let [N, M] = [matrix.length, matrix[0].length];

  // The two arrays as explained in the algorithm
  let result = new Array(N * M);
  let k = 0;

  // intermediate 表示的是现在遍历出来的东西
  let intermediate = [];

  // We have to go over all the elements in the first row and the last column to cover all possible diagonals
  for (let d = 0; d < N + M - 1; d++) {
    // Clear the intermediate array every time we start
    // to process another diagonal
    intermediate = [];

    // We need to figure out the "head" of this diagonal
    // The elements in the first row and the last column
    // are the respective heads.
    // 斜着push的index
    let r = d < M ? 0 : d - M + 1;
    let c = d < M ? d : M - 1;
    console.log(r, c);

    // Iterate until one of the indices goes out of scope
    // Take note of the index math to go down the diagonal
    // 斜着push的index
    while (r < N && c > -1) {
      intermediate.push(matrix[r][c]);
      r += 1;
      c -= 1;
    }

    console.log(intermediate);

    // Reverse even numbered diagonals. The
    // article says we have to reverse odd
    // numbered articles but here, the numbering
    // is starting from 0 :P
    if (d % 2 == 0) {
      intermediate.reverse();
    }

    for (let i = 0; i < intermediate.length; i++) {
      result[k] = intermediate[i];
      k += 1;
    }
  }

  return result;
};
// @lc code=end
