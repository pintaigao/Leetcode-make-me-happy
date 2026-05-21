// 我自己写的方法
var findDiagonalOrder10 = function (mat) {
  let result = [], size = mat.length * mat[0].length, direction = 0, x = 0, y = 0;

  while (result.length !== size) {
    let i = x, j = y
    if (direction % 2 == 0) {
      //向右斜上 row - 1 col + 1
      for (; i >= 0 && j < mat[0].length; i--, j++) { result.push(mat[i][j]) }
      // 右斜向上，如果最后一个点是在 i=0 的情况下（即i，j 目前的值 i<0，但是j 还在mat区间内，不包括最右上的那一个点，则最新的 i，j 值 x=0,y=j）
      if (i < 0 && j < mat[0].length) {
        x = 0; y = j
      } else { // 包括最右上的那个点，和之后的最后一个点落在 j=最后一列的情况下，i,j的最新值x = i+2，y=最后一列
        x = i + 1 + 1
        y = mat[0].length - 1;
      }
      direction += 1
    } else {
      //向左斜下 row + 1 col - 1
      for (; i < mat.length && j >= 0; i++, j--) { result.push(mat[i][j]) }
      // update x y end point
      if (j < 0 && i < mat.length) {
        x = i, y = 0;
      } else {
        x = mat.length - 1, y = j + 1 + 1;
      }
      direction += 1
    }
  }
  return result;
}

findDiagonalOrder10([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);

/* Solution 1: Diagonal Iteration and Reversal */
var findDiagonalOrder = function (mat) {
  // 检查是否为空
  if (matrix == null || matrix.length == 0) {
    return [];
  }

  // Variables to track the size of the matrix
  // The two arrays as explained in the algorithm
  // intermediate 表示的是现在遍历出来的东西
  let N = matrix.length, M = matrix[0].length, result = new Array(N * M), k = 0, intermediate = [];

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


