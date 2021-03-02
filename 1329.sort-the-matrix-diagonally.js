/*
 * @lc app=leetcode id=1329 lang=javascript
 *
 * [1329] Sort the Matrix Diagonally
 */

// @lc code=start
/**
 * @param {number[][]} mat
 * @return {number[][]}
 */

// Approach 1: Hash Table of Heaps
var diagonalSort = function (mat) {
  // Store the matrix dimensions
  let m = mat.length;
  let n = mat[0].length;

  // Data structure to store the diagonals.
  let diagonals = {};

  // Insert values into the HashMap.
  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      if (!diagonals[row - col]) {
        diagonals[row - col] = [];
      }
      diagonals[row - col].push(mat[row][col]);
    }
  }

  for (let key in diagonals) {
    diagonals[key].sort((a, b) => a - b);
  }

  // console.log(diagonals);

  // Take values back out of the HashMap.
  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      mat[row][col] = diagonals[row - col].shift();
    }
  }

  // console.log(mat);

  return mat;
};

// diagonalSort([
//   [11, 25, 66, 1, 69, 7],
//   [23, 55, 17, 45, 15, 52],
//   [75, 31, 36, 44, 58, 8],
//   [22, 27, 33, 25, 68, 4],
//   [84, 28, 14, 11, 5, 50],
// ]);

// Sort Diagonals One by One Using Counting Sort
let diagonalSort2 = function (mat) {
  let m = mat.length;
  let n = mat[0].length;

  let countingSort = function (nums) {
    // The problem constraints allow us to assume that
    // 1 <= mat[i][j] <= 100.
    // You should, however, confirm with the interviewer
    // that it is OK to hardcode values like this.
    let min = 1; // You could also use: Collections.min(nums);
    let max = 100; // You could also use: Collections.max(nums);

    // Calculate the range of values, and then create a list
    // of the size of the range.
    let len = max - min + 1;
    let count = new Array(len).fill(0);
    // Tally up the values in nums.
    for (let num of nums) {
      count[num - min] += 1;
    }

    // Flatten the list of counts into a sorted list.
    let sortedNums = [];
    for (let i = 0; i < len; i++) {
      for (let times = count[i]; times > 0; times--) {
        sortedNums.push(i + min);
      }
    }

    return sortedNums;
  };

  let sortDiagonal = function (row, col, mat) {
    let m = mat.length;
    let n = mat[0].length;
    let diagonal = [];

    let diagonalLength = Math.min(m - row, n - col);
    for (let i = 0; i < diagonalLength; i++) {
      diagonal.push(mat[row + i][col + i]);
    }

    // Sort the diagonal using our counting sort method.
    diagonal = countingSort(diagonal);

    for (let i = 0; i < diagonalLength; i++) {
      mat[row + i][col + i] = diagonal.shift();
    }
  };

  for (let row = 0; row < m; row++) {
    sortDiagonal(row, 0, mat);
  }

  for (let col = 1; col < n; col++) {
    sortDiagonal(0, col, mat);
  }

  return mat;
};

// Javascript的最快解
var diagonalSort3 = function (mat) {
  let m = mat.length; //3
  let n = mat[0].length; //4
  for (let i = 0; i < m; i++) {
    let arr = [];
    for (let j = 0, k = i; j < n, k < m; j++, ++k) {
      if (mat[k][j]) {
        arr.push(mat[k][j]);
      } else {
        break;
      }
    }
    arr.sort((a, b) => a - b);
    for (let j = 0, k = i, x = 0; j < n, k < m; j++, ++k, ++x) {
      if (mat[k][j]) {
        mat[k][j] = arr[x];
      } else {
        break;
      }
    }
  }

  for (let i = 1; i < n; i++) {
    let arr = [];
    for (let j = 0, k = i; j < m; j++, ++k) {
      if (mat[j][k]) arr.push(mat[j][k]);
      else break;
    }
    arr.sort((a, b) => a - b);
    for (let j = 0, k = i, x = 0; j < m, x < arr.length; j++, ++k, ++x) {
      if (mat[j][k]) {
        mat[j][k] = arr[x];
      } else {
        break;
      }
    }
  }
  return mat;
};
// @lc code=end
