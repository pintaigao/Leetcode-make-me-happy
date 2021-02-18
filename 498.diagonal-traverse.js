/*
 * @lc app=leetcode id=498 lang=javascript
 *
 * [498] Diagonal Traverse
 */

// @lc code=start
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */

// Approach 1: Diagonal Iteration and Reversal
var findDiagonalOrder = function (matrix) {
  // Check for empty matrices
  if (matrix == null || matrix.length == 0) {
    return [];
  }

  // Variables to track the size of the matrix
  let N = matrix.length;
  let M = matrix[0].length;

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

// Approach 2: Simulation (还没看)
var findDiagonalOrder2 = function (matrix) {
  // Check for empty matrices
  if (matrix == null || matrix.length == 0) {
    return new int[0]();
  }

  // Variables to track the size of the matrix
  let N = matrix.length;
  let M = matrix[0].length;

  // Incides that will help us progress through
  // the matrix, one element at a time.
  let row = 0,
    column = 0;

  // As explained in the article, this is the variable
  // that helps us keep track of what direction we are
  // processing the current diaonal
  let direction = 1;

  // The final result array
  let result = new Array(N * M);
  let r = 0;

  // The uber while loop which will help us iterate over all
  // the elements in the array.
  while (row < N && column < M) {
    // First and foremost, add the current element to
    // the result matrix.
    result[r] = matrix[row][column];

    r += 1;

    // Move along in the current diagonal depending upon
    // the current direction.[i, j] -> [i - 1, j + 1] if
    // going up and [i, j] -> [i + 1][j - 1] if going down.
    let new_row = row + (direction == 1 ? -1 : 1);
    let new_column = column + (direction == 1 ? 1 : -1);

    // Checking if the next element in the diagonal is within the
    // bounds of the matrix or not. If it's not within the bounds,
    // we have to find the next head.
    if (new_row < 0 || new_row == N || new_column < 0 || new_column == M) {
      // If the current diagonal was going in the upwards
      // direction.
      if (direction == 1) {
        // For an upwards going diagonal having [i, j] as its tail
        // If [i, j + 1] is within bounds, then it becomes
        // the next head. Otherwise, the element directly below
        // i.e. the element [i + 1, j] becomes the next head
        row += column == M - 1 ? 1 : 0;
        column += column < M - 1 ? 1 : 0;
      } else {
        // For a downwards going diagonal having [i, j] as its tail
        // if [i + 1, j] is within bounds, then it becomes
        // the next head. Otherwise, the element directly below
        // i.e. the element [i, j + 1] becomes the next head
        column += row == N - 1 ? 1 : 0;
        row += row < N - 1 ? 1 : 0;
      }

      // Flip the direction
      direction = 1 - direction;
    } else {
      row = new_row;
      column = new_column;
    }
  }
  return result;
};

findDiagonalOrder([
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
  [11, 12, 13, 14, 15],
  [16, 17, 18, 19, 20],
]);
// @lc code=end
