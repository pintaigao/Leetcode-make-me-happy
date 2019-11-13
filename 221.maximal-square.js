/*
 * @lc app=leetcode id=221 lang=javascript
 *
 * [221] Maximal Square
 */
/**
 * @param {character[][]} matrix
 * @return {number}
 */
// var maximalSquare = function (matrix) {
//   if (!matrix.length || !matrix[0].length)
//     return 0
//   let dp = matrix.slice(), max = Math.max(...matrix[0])
//   for (let i = 0; i < matrix.length; i++) {
//     max = Math.max(matrix[i][0], max)
//   }
//   for (let i = 1; i < matrix.length; i++) {
//     for (let j = 1; j < matrix[0].length; j++) {
//       if (matrix[i][j] == '0')
//         continue
//       dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1
//       if (dp[i][j] > max)
//         max = dp[i][j]
//     }
//   }
//   return max ** 2

// };

var maximalSquare = function (matrix) {
  if (matrix.length == 1) {
    for (let i = 0; i < matrix[0].length; i++) {
      if (matrix[0][i] === '1') return 1;
    }
  }
  let result = 0;
  for (let i = 1; i < matrix.length; i++) {
    for (let j = 1; j < matrix[0].length; j++) {
      if (matrix[i][j] === "1") {
        matrix[i][j] = Math.min(Math.min(matrix[i][j - 1], matrix[i - 1][j]), matrix[i - 1][j - 1]) + 1;
        result = Math.max(result, matrix[i][j]);
      }
    }
  }

  return result * result;
}

