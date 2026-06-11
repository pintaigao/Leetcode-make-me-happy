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
  // Data structure to store the diagonals.
  let m = mat.length, n = mat[0].length, diagonals = {};

  // 按照斜的方向，把每一个斜线（key=row-col）上的值放入到diagonals map中(value)
  // diagonals[row - col].push(mat[row][col]);
  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      if (!diagonals[row - col]) {
        diagonals[row - col] = [];
      }
      diagonals[row - col].push(mat[row][col]);
    }
  }

  // 排序.从小到大
  for (let key in diagonals) {
    diagonals[key].sort((a, b) => a - b);
  }

  // 放回原来的位置
  for (let row = 0; row < m; row++) {
    for (let col = 0; col < n; col++) {
      mat[row][col] = diagonals[row - col].shift();
    }
  }

  return mat;
};

// diagonalSort([
//   [11, 25, 66, 1, 69, 7],
//   [23, 55, 17, 45, 15, 52],
//   [75, 31, 36, 44, 58, 8],
//   [22, 27, 33, 25, 68, 4],
//   [84, 28, 14, 11, 5, 50],
// ]);

// Solution 2: Sort Diagonals One by One Using Counting Sort
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

// Javascript 依据index遍历斜向下的方式原地更改的方法
var diagonalSort3 = function (mat) {
  //  行数 //  列数
  let m = mat.length, n = mat[0].length;
  // 2d array的中间斜线的下半边，包括中间斜线
  for (let i = 0; i < m; i++) {
    let arr = [];
    // 斜线：即每一步都是 x+1，y+1，所以先定好起点坐标，如果[0,0], 起点[1,0], 然后把每一个斜线上的值放入到arr中
    for (let k = i, j = 0; k < m && j < n; k++, j++) {
      arr.push(mat[k][j]);
    }

    // 排序
    arr.sort((a, b) => a - b);
    // 放回原来的位置
    for (let j = 0, k = i, x = 0; j < n && k < m; j++, k++, x++) {
      mat[k][j] = arr[x];
    }
  }

  // 2d array的中间斜线的上半边，不包括中间斜线
  for (let i = 1; i < n; i++) {
    let arr = [];
    // 每个斜边上的值push到arr中
    for (let j = 0, k = i; j < m && k < n; j++, k++) {
      arr.push(mat[j][k]);
    }
    // 排序
    arr.sort((a, b) => a - b);
    // 把排序好的值放回原来的位置
    for (let j = 0, k = i, x = 0; j < m && k < n && x < arr.length; j++, k++, x++) {
      mat[j][k] = arr[x];
    }
  }

  return mat;
};

// diagonalSort3([
//   [11, 25, 66, 1, 69, 7],
//   [23, 55, 17, 45, 15, 52],
//   [75, 31, 36, 44, 58, 8],
//   [22, 27, 33, 25, 68, 4],
//   [84, 28, 14, 11, 5, 50],
// ]);

diagonalSort3([[37, 98, 82, 45, 42]])
// @lc code=end
